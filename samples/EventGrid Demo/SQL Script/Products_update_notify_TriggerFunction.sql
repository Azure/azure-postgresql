-- FUNCTION: public."Products_update_notify"()

-- DROP FUNCTION public."Products_update_notify"();

CREATE FUNCTION public."Products_update_notify"()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$
DECLARE
  Id uuid;
  Name character varying(512);
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    Id = NEW."Id";
	Name = NEW."Name";
  ELSE
    Id = OLD."Id";
	Name = OLD."Name";
  END IF;
  PERFORM pg_notify('productsnotification', TG_OP || ';' || Id || ';' || Name);
  RETURN NEW;
END;

$BODY$;

ALTER FUNCTION public."Products_update_notify"()
    OWNER TO pgadmin;
