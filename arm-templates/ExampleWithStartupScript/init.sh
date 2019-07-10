#!/bin/bash

SERVERNAME=$1
USERNAME=$2
PASSWORD=$3
export DEBIAN_FRONTEND=noninteractive
rm /var/lib/apt/lists/* -vrf
apt-get -y update
apt-get -y install postgresql-client
export PGSSLMODE=require
export PGPASSWORD=$PASSWORD
psql -h $SERVERNAME.postgres.database.azure.com -p 5432 -U $USERNAME@$SERVERNAME -d postgres -a -f init.sql