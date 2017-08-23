CREATE TYPE website.order_list AS 
(
order_reference integer,
customer_id integer,
contact_person_id integer,
expected_delivery_date date,
customer_purchase_order_number varchar(20),
is_undersupply_backordered boolean,
comments text,
delivery_instructions text
);
