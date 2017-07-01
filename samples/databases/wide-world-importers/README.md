## Initial Release of wide_world_importers_pg

(Greg Low 30 Jun 2017)

Aim of this project was to create an Azure PostgreSQL compatible version of the WideWorldImporters database.

The core tables, sequences, and data have been loaded.

The file provided is in .dump format. To restore it, follow these steps:

1. Connect to your Azure PostgreSQL server (using pgAdmin or other tool)
2. Create a database (likely called wide_world_importers_pg and with azure_pg_admin as the owner)
3. Restore the database by executing the command:

`pg_restore -h yourazurepgserver.database.windows.net -p 5432 -U yourusername -W -v -Fc -d wide_world_importers_pg < wide_world_importers_pg.dump`





