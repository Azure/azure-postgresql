#!/bin/bash
#
# PURPOSE
# Create Azure Database for PostgreSQL Server Master and Replica Servers
# 
# PREREQUISITES
# Azure CLI (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)
# 
# NOTE
# Please modify the script to specify different options for master server creation
# https://docs.microsoft.com/en-us/cli/azure/postgres/server?view=azure-cli-latest
# 
# USAGE
# bash pgreplica.sh
#         --subscription-id 'ffffffff-ffff-ffff-ffff-ffffffffffff'
#         --resource-group 'replicaRG'
#         --region 'northeurope'
#         --server-name 'mypg'
#         --admin-user 'azureuser'
#         --admin-password 'P@ssw0rd1'
#         --sku-name 'GP_Gen5_2'
#         --number-of-replicas '5'
#

function usage()
{
    echo ""
    echo "PURPOSE"
    echo "Create Azure Database for PostgreSQL Server Master and Replica Servers"
    echo ""
    echo "PREREQUISITES"
    echo "Azure CLI (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)"
    echo ""
    echo "NOTE"
    echo "Please modify the script to specify different options for master server creation"
    echo "https://docs.microsoft.com/en-us/cli/azure/postgres/server?view=azure-cli-latest"
    echo ""
    echo "USAGE"
    echo "bash pgreplica.sh"
    echo -e "\t--subscription-id 'ffffffff-ffff-ffff-ffff-ffffffffffff'"
    echo -e "\t--resource-group 'replicaRG'"
    echo -e "\t--region 'northeurope'"
    echo -e "\t--server-name 'mypg'"
    echo -e "\t--admin-user 'azureuser'"
    echo -e "\t--admin-password 'P@ssw0rd1'"
    echo -e "\t--sku-name 'GP_Gen5_2'"
    echo -e "\t--number-of-replicas '5'"
    echo ""
}

PARAMS=""
while (( "$#" )); do
  case "$1" in
    -h | --help)
      usage
      exit
      ;;
    -a|--subscription-id)
      SUBSCRIPTION_ID=$2
      shift 2
      ;;
    -b|--resource-group)
      RESOURCE_GROUP=$2
      shift 2
      ;;
    -c|--region)
      REGION=$2
      shift 2
      ;;
    -d|--server-name)
      SERVER_NAME=$2
      shift 2
      ;;
    -e|--admin-user)
      ADMIN_USER=$2
      shift 2
      ;;
    -f|--admin-password)
      ADMIN_PASSWORD=$2
      shift 2
      ;;
    -g|--sku-name)
      SKU_NAME=$2
      shift 2
      ;;
    -h|--number-of-replicas)
      NUMBER_OF_REPLICAS=$2
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

# Prerequisites - Install Azure CLI
if ! [ -x "$(command -v az)" ]; then
  echo 'Error: azure cli is not installed. Please install from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest' >&2
  exit 1
fi

# Login
az login

# Set Default Subscription
az account set --subscription "$SUBSCRIPTION_ID"

# Set Default Resource Group
az configure --defaults group="$RESOURCE_GROUP"

# Create Master Server
az postgres server create --location "$REGION" --name "$SERVER_NAME" --admin-user "$ADMIN_USER" --admin-password "$ADMIN_PASSWORD" --sku-name "$SKU_NAME"

# Set azure.replication_support to REPLICA
az postgres server configuration set --name "azure.replication_support" --server-name "$SERVER_NAME" --value "REPLICA"

# Restart Master Server
az postgres server restart --name "$SERVER_NAME"

# Create Replicas
for ((i=1; i<=NUMBER_OF_REPLICAS; i++)); do
  az postgres server replica create --name "$SERVER_NAME-replica-$i" --source-server "$SERVER_NAME"
done

# Logout
azure logout -u "$SUBSCRIPTION_ID"

# Visit Master Server Replication Page
echo "Master and Replicas Creation Successful !!"
echo "Master Server : https://portal.azure.com/#resource/subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.DBforPostgreSQL/servers/$SERVER_NAME/replication"
