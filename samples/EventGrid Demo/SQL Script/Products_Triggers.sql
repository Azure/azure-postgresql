-- Trigger: products_notify_delete

-- DROP TRIGGER products_notify_delete ON public."Products";

CREATE TRIGGER products_notify_delete
    AFTER DELETE
    ON public."Products"
    FOR EACH ROW
    EXECUTE PROCEDURE public."Products_update_notify"();
	
-- Trigger: products_notify_insert

-- DROP TRIGGER products_notify_insert ON public."Products";

CREATE TRIGGER products_notify_insert
    AFTER INSERT
    ON public."Products"
    FOR EACH ROW
    EXECUTE PROCEDURE public."Products_update_notify"();

-- Trigger: products_notify_update

-- DROP TRIGGER products_notify_update ON public."Products";

CREATE TRIGGER products_notify_update
    AFTER UPDATE 
    ON public."Products"
    FOR EACH ROW
    EXECUTE PROCEDURE public."Products_update_notify"();