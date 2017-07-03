CREATE OR REPLACE FUNCTION website.insert_customer_orders
(
IN orders website.order_list[],
IN order_lines website.order_line_list[],
IN orders_created_by_person_id integer,
IN salesperson_person_id integer
)
RETURNS void
LANGUAGE 'plpgsql'
AS $$
BEGIN

CREATE TEMPORARY TABLE IF NOT EXISTS orders_to_generate
(
order_reference integer NOT NULL PRIMARY KEY,
order_id integer NOT NULL
)
ON COMMIT DELETE ROWS;

INSERT INTO orders_to_generate
(
order_reference,
order_id
)
SELECT order_reference,
       nextval('sequences.order_id')
FROM unnest(insert_customer_orders.orders);

INSERT INTO sales.orders
(
order_id,
customer_id,
salesperson_person_id,
picked_by_person_id,
contact_person_id,
backorder_order_id,
order_date,
expected_delivery_date,
customer_purchase_order_number,
is_undersupply_backordered,
comments,
delivery_instructions,
internal_comments,
picking_completed_when,
last_edited_by,
last_edited_when
)
SELECT otg.order_id,
       o.customer_id,
       insert_customer_orders.salesperson_person_id,
       null,
       o.contact_person_id,
       null,
       current_date,
       o.expected_delivery_date,
       o.customer_purchase_order_number,
       o.is_undersupply_backordered,
       o.comments,
       o.delivery_instructions,
       null,
       null,
       insert_customer_orders.orders_created_by_person_id,
       localtimestamp
FROM orders_to_generate AS otg
INNER JOIN unnest(insert_customer_orders.orders) AS o
ON otg.order_reference = o.order_reference;

INSERT INTO sales.order_lines
(
order_id,
stock_item_id,
description,
package_type_id,
quantity,
unit_price,
tax_rate,
picked_quantity,
picking_completed_when,
last_edited_by,
last_edited_when
)
SELECT otg.order_id,
       ol.stock_item_id,
       ol.description,
       si.unit_package_id,
       ol.quantity,
       website.calculate_customer_price(o.customer_id, ol.stock_item_id, current_date),
       si.tax_rate,
       0,
       NULL,
       insert_customer_orders.orders_created_by_person_id,
       localtimestamp
FROM orders_to_generate AS otg
INNER JOIN unnest(insert_customer_orders.order_lines) AS ol
on otg.order_reference = ol.order_reference
INNER JOIN unnest(insert_customer_orders.orders) AS o
on ol.order_reference = o.order_reference
INNER JOIN warehouse.stock_items AS si
ON ol.stock_item_id = si.stock_item_id;

EXCEPTION
WHEN OTHERS THEN
    RAISE NOTICE 'Unable to create the customer orders.';
    RAISE;
END;

$$;
