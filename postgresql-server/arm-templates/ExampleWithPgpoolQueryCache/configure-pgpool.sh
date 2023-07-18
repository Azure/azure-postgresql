#!/bin/bash

SERVERNAME=$1
USERNAME=$2
PASSWORD=$3
export DEBIAN_FRONTEND=noninteractive
rm /var/lib/apt/lists/* -vrf
apt-get -y update

# Install Pgpool II and Memcached
apt-get -y install pgpool2 memcached

# Pgpool query cache requires a work directory to record table oids
mkdir -p /var/log/pgpool/oiddir
chown postgres:postgres /var/log/pgpool/oiddir

# Before modifying Pgpool and Memcached config files, save them 
cp /etc/pgpool2/pgpool.conf  /etc/pgpool2/pgpool.conf.save
cp /etc/pgpool2/pool_hba.conf /etc/pgpool2/pool_hba.conf.save
cp /etc/memcached.conf /etc/memcached.conf.save

# Create self-signed certificate to allow connecting to Pgpool using SSL
# Note: Adjust this step to meet your security requirements
openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj "/C=US/ST=Denial/L=Seattle/O=Dis/CN=www.pgpooltest.org" -keyout /etc/pgpool2/server.key  -out /etc/pgpool2/server.crt

## Modify Pgpool config ##

# Turn SSL on
sed -i 's/ssl = off/ssl = on/g' /etc/pgpool2/pgpool.conf

# Use SSL key and cert created above
sed -i "s/#ssl_key = '.\/server.key'/ssl_key = '\/etc\/pgpool2\/server.key'/g" /etc/pgpool2/pgpool.conf
sed -i "s/#ssl_cert = '.\/server.cert'/ssl_cert = '\/etc\/pgpool2\/server.crt'/g" /etc/pgpool2/pgpool.conf

# Accept all incoming connections 
sed -i "s/listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/pgpool2/pgpool.conf

# Set Azure PostgreSQL backend
sed -i "s/backend_hostname0 = 'localhost'/backend_hostname0 = '$SERVERNAME.postgres.database.azure.com'/g" /etc/pgpool2/pgpool.conf 

# Use pool_hba.conf for client authentication
sed -i 's/enable_pool_hba = off/enable_pool_hba = on/g' /etc/pgpool2/pgpool.conf

# Enable query cache
sed -i "s/memory_cache_enabled = off/memory_cache_enabled = on/g" /etc/pgpool2/pgpool.conf 

# Use Memcached as query cache store
sed -i "s/memqcache_method = 'shmem'/memqcache_method = 'memcached'/g" /etc/pgpool2/pgpool.conf

# Require all clients connecting to Pgpool to authenticate with password (scram-sha-256 in this case)
echo "host all all 0.0.0.0/0 scram-sha-256" > /etc/pgpool2/pool_hba.conf

# Write pool_passwd used by Pgpool for password authentication with Azure PostgreSQL backend
echo $USERNAME@$SERVERNAME:$PASSWORD > /etc/pgpool2/pool_passwd
chmod 600 /etc/pgpool2/pool_passwd
chown postgres:postgres /etc/pgpool2/*

## Modify Memcached config ##

# Allow Memcached to use 1024 MB of memory
sed -i "s/m 64/m 1024/g" /etc/memcached.conf

## Start Pgpool and Memcached services ##

# Start Memcached
service memcached restart

# Set defaults for Pgpool service
echo "PGPOOL_CONFIG_FILE=/etc/pgpool2/pgpool.conf" >> /etc/default/pgpool2
echo "PGPOOL_HBA_CONFIG_FILE=/etc/pgpool2/pool_hba.conf" >> /etc/default/pgpool2
echo "PGPOOL_PCP_CONFIG_FILE=/etc/pgpool2/pcp.conf" >> /etc/default/pgpool2
echo "PGPOOL_PID_FILE=/var/run/postgresql/pgpool.pid" >> /etc/default/pgpool2
update-rc.d pgpool2 defaults

# Start Pgpool
service pgpool2 restart

sleep 60