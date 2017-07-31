class WaypointController < ApplicationController
	protect_from_forgery with: :null_session
	require 'json'
	require 'httparty'

	def waypoint
		# fetch connection string from database.yml file
		$connection_string = (ActiveRecord::Base.configurations["azure_dayplanner_db"])
		$connection = ActiveRecord::Base.establish_connection($connection_string["Postgres.connstr"])
		$pgAdminUser = $connection_string["pgAdminUser"]
		if request.post?
			if params
				# Insert data.
				title = params[:title]
				meeting_date =  params[:meeting_date]
				start_time = params[:start_time]
				end_time = params[:end_time]
				loc_name= params[:loc_name]
				latitude = params[:lat]
				longitude = params[:long]
				query = "INSERT INTO engagements(loc_name, title, date, start_time, end_time, location) VALUES ('#{loc_name}', '#{title}', '#{meeting_date}', '#{start_time}', '#{end_time}', ST_GeographyFromText('point(#{longitude} #{latitude})'));";
				$request = ActiveRecord::Base.connection.execute(query)
				objLocationArray = Array.new
				$results.each{|r| objLocationArray.push(r)}
				@data=objLocationArray
				respond_to do |format|
					format.html
					format.json { render json: $results }  # respond with the created JSON object
				end
			end
		else
			if params[:date]
				# Check for engagements table availability
				date = params[:date]
				date.delete! "'"
				selected_date = "'" + (date.split('/')[2] + "/" + date.split('/')[0] + "/" + date.split('/')[1]) + "'";
				table_exists_query = "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'engagements');"
				$table_exists = ActiveRecord::Base.connection.execute(table_exists_query)
				object_result = Array.new
				$table_exists.each{|res| object_result.push(res)}
				table_exists = (object_result[0])["exists"]
				if table_exists == true
					get_query = "select array_to_json(array_agg(row_to_json(t))) as meeting_data from (select loc_id, loc_name, title, date, to_char(start_time::time, 'HH12:MI AM') as start, to_char(end_time::time, 'HH12:MI AM') as end, ST_AsGeoJSON(location)::json As geometry from engagements where date = #{selected_date} ORDER BY start_time ) as t; "
					$results = ActiveRecord::Base.connection.execute(get_query)
					objLocationArray = Array.new
					$results.each{|r| objLocationArray.push(r)}
					@data=objLocationArray
					respond_to do |format|
						format.html
						format.json { render json: $results }  # respond with the created JSON object
					end
				else
					# Schema to create an table and adding sample data.
					sample_query = "CREATE EXTENSION postgis SCHEMA public VERSION '2.3.2';\
					CREATE TABLE engagements ( \
                           loc_id integer NOT NULL, \
                           loc_name character varying(255), \
                           title character varying(255), \
                           date date, \
                           start_time time without time zone, \
                           end_time time without time zone, \
                           location geography(Point)); \
                           ALTER TABLE public.engagements OWNER TO "+ $pgAdminUser +"; \
                           CREATE SEQUENCE engagements_loc_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1; \
                           ALTER TABLE public.engagements_loc_id_seq OWNER TO "+ $pgAdminUser +"; \
                           ALTER SEQUENCE engagements_loc_id_seq OWNED BY engagements.loc_id; \
                           ALTER TABLE ONLY engagements ALTER COLUMN loc_id SET DEFAULT nextval('engagements_loc_id_seq'::regclass); \
                           ALTER TABLE ONLY engagements ADD CONSTRAINT engagements_pkey PRIMARY KEY (loc_id); \
                           INSERT INTO engagements(loc_name, title, date, start_time, end_time, location) VALUES\
                           ('Redmond, WA, USA', 'First Engagement', CURRENT_DATE, '10:00 AM', '11:00 AM', ST_GeographyFromText('point(-122.095741 47.676295)')),\
                           ('Seattle, WA, USA', 'Second Engagement', CURRENT_DATE, '1:00 PM', '2:00 PM', ST_GeographyFromText('point(-122.329064 47.592306)')),\
                           ('Bellevue, WA, USA', 'Third Engagement', CURRENT_DATE, '3:00 PM', '4:00 PM', ST_GeographyFromText('point(-122.201489 47.610139)')),\
                           ('Renton, WA, USA', 'Fourth Engagement', CURRENT_DATE, '5:30 PM', '6:00 PM', ST_GeographyFromText('point(-122.218031 47.471115)')),\
                           ('Tacoma, WA, USA', 'Last Engagement', CURRENT_DATE, '7:00 PM', '8:00 PM', ST_GeographyFromText('point(-122.457853 47.233862)'));";
					$request = ActiveRecord::Base.connection.execute(sample_query)
					get_query = "select array_to_json(array_agg(row_to_json(t))) as meeting_data from (select loc_id, loc_name, title, date, to_char(start_time::time, 'HH12:MI AM') as start, to_char(end_time::time, 'HH12:MI AM') as end, ST_AsGeoJSON(location)::json As geometry from engagements where date = #{selected_date} ORDER BY start_time ) as t; "
					$results = ActiveRecord::Base.connection.execute(get_query)
					objLocationArray = Array.new
					$results.each{|r| objLocationArray.push(r)}
					@data=objLocationArray
					respond_to do |format|
						format.html
						format.json { render json: $results }  # respond with the created JSON object
					end
				end
			end
		end
	end

	# Create index for Azure Search Service
	def index
		$config_info = (ActiveRecord::Base.configurations["azure_dayplanner_db"])
		file = File.open('app/assets/javascripts/Payloads.js')
		create_index = JSON.parse(file.read)
		create_data = create_index.to_json
		url = "#{$config_info["serviceURL"]}" + "/indexes/" + "#{$config_info["Azuresearch.indexName"]}" + "/?api-version=" + "#{$config_info["Azuresearch.apiVersion"]}"
		create_response = HTTParty.put(url, headers: {'api-key': "#{$config_info["apiKey"]}", 'Content-Type' => 'application/json'}, body: create_data, verify: false )
		if create_response.code == 201
			insert_index_data
		end
	end
	# Add sample data into created index
	def insert_index_data
		url = "#{$config_info["serviceURL"]}" + "/indexes/" + "#{$config_info["Azuresearch.indexName"]}" + "/docs/index?api-version=" + "#{$config_info["Azuresearch.apiVersion"]}"
		file = File.open('app/assets/javascripts/index_data.js')
		create_index = JSON.parse(file.read)
		insert_data = render :json => create_index
		insert_response = HTTParty.post(url, headers: {'api-key': "#{$config_info["apiKey"]}", 'Content-Type' => 'application/json'}, body: insert_data, verify: false )
	end
	# fetch save data from azure search.
	def get_index_data
		if params
			lat= params[:latitude]
			lng = params[:longitude]
			radius = params[:radius]
			url = "#{$config_info["serviceURL"]}" + "/indexes/" + "#{$config_info["Azuresearch.indexName"]}" + "/docs?api-version=" + "#{$config_info["Azuresearch.apiVersion"]}" + "&search=*&%24filter=geo.distance(location%2C%20geography'POINT(" + lng + "%20" + lat + ")')%20le%20" + radius + "&%24top=1000"
			$get_index_response = HTTParty.get(url, headers: {'api-key': "#{$config_info["apiKey"]}", 'Content-Type' => 'application/json'}, verify: false )
			objLocationArray = Array.new
			$get_index_response.each{|r| objLocationArray.push(r)}
			@data=objLocationArray
			respond_to do |format|
				format.html
				format.json { render json: $get_index_response }
			end
		end
	end
end
