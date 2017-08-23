CREATE TYPE website.order_line_list AS
(
order_reference integer,
stock_item_id integer,
description varchar(100),
quantity integer
);
