#!/bin/bash
#
# PURPOSE
# Migrate Azure Database for PostgreSQL Server from Basic to General Purpose/Memory Optimized
# 
# PREREQUISITES
# Azure CLI (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
# postgresql-client tools - pg_dump and pg_restore (https://www.postgresql.org/download/linux)
# 
# NOTE
# Target server and database are created in this script.
# Please modify the script to specify different options for creation
# https://docs.microsoft.com/en-us/cli/azure/postgres/server?view=azure-cli-latest
# 
# USAGE
# bash pgmigrate.sh
#         --source-subscription-id 'ffffffff-ffff-ffff-ffff-ffffffffffff'
#         --source-resource-group-name 'sourceRG'
#         --source-server-name 'sourcepg'
#         --source-username 'sourceuser'
#         --source-password 'P@ssw0rd1'
#         --source-database-name 'sourcedb'
#         --target-subscription-id 'ffffffff-ffff-ffff-ffff-ffffffffffff'
#         --target-resource-group-name 'targetRG'
#         --target-region 'eastus'
#         --target-server-name 'targetpg'
#         --target-username 'targetuser'
#         --target-password 'P@ssw0rd2'
#         --target-database-name 'targetdb'
#         --target-sku 'GP_Gen5_2'
#

function usage()
{
    echo ""
    echo "PURPOSE"
    echo "Migrate Azure Database for PostgreSQL Server database from Basic Pricing Tier to General Purpose/Memory Optimized"
    echo ""
    echo "PREREQUISITES"
    echo "Azure CLI (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)"
    echo "postgresql-client tools - pg_dump and pg_restore (https://www.postgresql.org/download/linux)"
    echo ""
    echo "NOTE"
    echo "Target server and database are created in this script."
    echo "Please modify the script to specify different options for server creation"
    echo "https://docs.microsoft.com/en-us/cli/azure/postgres/server?view=azure-cli-latest"
    echo ""
    echo "USAGE"
    echo "bash pgmigrate.sh"
    echo -e "\t--source-subscription-id 'ffffffff-ffff-ffff-ffff-ffffffffffff'"
    echo -e "\t--source-resource-group-name 'sourceRG'"
    echo -e "\t--source-server-name 'sourcepg'"
    echo -e "\t--source-username 'sourceuser'"
    echo -e "\t--source-password 'P@ssw0rd1'"
    echo -e "\t--source-database-name 'sourcedb'"
    echo -e "\t--target-subscription-id 'ffffffff-ffff-ffff-ffff-ffffffffffff'"
    echo -e "\t--target-resource-group-name 'targetRG'"
    echo -e "\t--target-region 'eastus'"
    echo -e "\t--target-server-name 'targetpg'"
    echo -e "\t--target-username 'targetuser'"
    echo -e "\t--target-password 'P@ssw0rd2'"
    echo -e "\t--target-database-name 'targetdb'"
    echo -e "\t--target-sku 'GP_Gen5_2'"
    echo ""
}

PARAMS=""
while (( "$#" )); do
  case "$1" in
    -h | --help)
      usage
      exit
      ;;
    -a|--source-subscription-id)
      SOURCE_SUBSCRIPTION_ID=$2
      shift 2
      ;;
    -b|--source-resource-group-name)
      SOURCE_RESOURCE_GROUP_NAME=$2
      shift 2
      ;;
    -c|--source-server-name)
      SOURCE_SERVER_NAME=$2
      shift 2
      ;;
    -d|--source-username)
      SOURCE_USERNAME=$2
      shift 2
      ;;
    -e|--source-password)
      SOURCE_PASSWORD=$2
      shift 2
      ;;
    -f|--source-database-name)
      SOURCE_DATABASE_NAME=$2
      shift 2
      ;;
    -g|--target-subscription-id)
      TARGET_SUBSCRIPTION_ID=$2
      shift 2
      ;;
    -h|--target-resource-group-name)
      TARGET_RESOURCE_GROUP_NAME=$2
      shift 2
      ;;
    -i|--target-region)
      TARGET_REGION=$2
      shift 2
      ;;
    -j|--target-server-name)
      TARGET_SERVER_NAME=$2
      shift 2
      ;;
    -k|--target-username)
      TARGET_USERNAME=$2
      shift 2
      ;;
    -l|--target-password)
      TARGET_PASSWORD=$2
      shift 2
      ;;
    -m|--target-database-name)
      TARGET_DATABASE_NAME=$2
      shift 2
      ;;
    -n|--target-sku)
      TARGET_SKU=$2
      shift 2
      ;;
    --) # end argument parsing
      shift
      break
      ;;
    -*|--*=) # unsupported flags
      echo "Error: Unsupported flag $1" >&2
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done
# set positional arguments in their proper place
eval set -- "$PARAMS"

# Prerequisites - Install Azure CLI and postgresql-client package
if ! [ -x "$(command -v az)" ]; then
  echo 'Error: azure cli is not installed. Please install from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest' >&2
  exit 1
fi

if ! [ -x "$(command -v pg_dump)" ]; then
  echo 'Error: pg_dump command does not exist. Please install from https://www.postgresql.org/download' >&2
  exit 1
fi

if ! [ -x "$(command -v pg_restore)" ]; then
  echo 'Error: pg_restore command does not exist. Please install from https://www.postgresql.org/download' >&2
  exit 1
fi

# Login to source subscription
az login
az account set --subscription "$SOURCE_SUBSCRIPTION_ID"

# Set PG SSL Mode
export PGSSLMODE=require

# Firewall rule name to allow the current VM
export FIREWALLRULENAME="AllowAllIps$(date +%s)"

# Create firewall rule on the source server to allow connections from current VM
az postgres server firewall-rule create -g "$SOURCE_RESOURCE_GROUP_NAME" -s "$SOURCE_SERVER_NAME" -n "$FIREWALLRULENAME" --start-ip-address "0.0.0.0" --end-ip-address "255.255.255.255"

# Export pg password to be used by the pg_dump command
export PGPASSWORD=$SOURCE_PASSWORD

# Export PG database name to be used by the pg_dump command
export PGDATABASE=$SOURCE_DATABASE_NAME

# Remove dump file if it already exists
[ -e "$SOURCE_DATABASE_NAME.dump" ] && rm -f "$SOURCE_DATABASE_NAME.dump"

# Create a dump file of the source db
pg_dump -Fc -v --host="$SOURCE_SERVER_NAME.postgres.database.azure.com" --username="$SOURCE_USERNAME@$SOURCE_SERVER_NAME" --file="$SOURCE_DATABASE_NAME.dump"

# check that filesize of dump file is greater than 0
if ! [ -s "$SOURCE_DATABASE_NAME.dump" ]; then
  echo 'Error during pg_dump' >&2
  exit 1
fi

# Login to target subscription 
az account set --subscription "$TARGET_SUBSCRIPTION_ID"

# Set target server password
export PGPASSWORD=$TARGET_PASSWORD

# Create the target server in the specified region
az postgres server create -l "$TARGET_REGION" -g "$TARGET_RESOURCE_GROUP_NAME" -n "$TARGET_SERVER_NAME" -u "$TARGET_USERNAME" -p "$PGPASSWORD" --sku-name "$TARGET_SKU"

# Create the target database
az postgres db create -g "$TARGET_RESOURCE_GROUP_NAME" -s "$TARGET_SERVER_NAME" -n "$TARGET_DATABASE_NAME"

# Create firewall rule on the target server to allow connections from current VM
az postgres server firewall-rule create -g "$TARGET_RESOURCE_GROUP_NAME" -s "$TARGET_SERVER_NAME" -n "$FIREWALLRULENAME" --start-ip-address "0.0.0.0" --end-ip-address "255.255.255.255"

# Export PG database name to be used by the pg_restore command
export PGDATABASE=$TARGET_DATABASE_NAME

# Restore the database using source database dump file
pg_restore -v --no-owner --host="$TARGET_SERVER_NAME.postgres.database.azure.com" --port=5432 --username="$TARGET_USERNAME@$TARGET_SERVER_NAME" "$SOURCE_DATABASE_NAME.dump"

# Delete firewall rules and local dump file
az postgres server firewall-rule delete -g "$SOURCE_RESOURCE_GROUP_NAME" -s "$SOURCE_SERVER_NAME" -n "$FIREWALLRULENAME" --yes
az postgres server firewall-rule delete -g "$TARGET_RESOURCE_GROUP_NAME" -s "$TARGET_SERVER_NAME" -n "$FIREWALLRULENAME" --yes
rm -f "$SOURCE_DATABASE_NAME.dump"

# Logout
azure logout -u "$TARGET_SUBSCRIPTION_ID"

# Visit Target Server
echo "Migration Succesfull !!"
echo "Target Server : https://portal.azure.com/#resource/subscriptions/$TARGET_SUBSCRIPTION_ID/resourceGroups/$TARGET_RESOURCE_GROUP_NAME/providers/Microsoft.DBforPostgreSQL/servers/$TARGET_SERVER_NAME/overview"
