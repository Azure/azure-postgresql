Rails.application.routes.draw do
  get 'waypoint/waypoint'  
  post 'waypoint/waypoint'  
  root 'waypoint#waypoint'
  
  get 'waypoint/index'
  post 'waypoint/index'
  root 'waypoint#index'

  get 'waypoint/get_index_data'
  post 'waypoint/get_index_data'
  root 'waypoint#get_index_data'
end
