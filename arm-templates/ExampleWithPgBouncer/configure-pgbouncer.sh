#!/bin/bash

SERVERNAME=$1
USERNAME=$2
PASSWORD=$3
export DEBIAN_FRONTEND=noninteractive
rm /var/lib/apt/lists/* -vrf
apt-get -y update
apt-get -y install pgbouncer
echo "\"$USERNAME@$SERVERNAME\" \"$PASSWORD\"" > /etc/pgbouncer/userlist.txt
wget https://www.digicert.com/CACerts/BaltimoreCyberTrustRoot.crt
openssl x509 -inform DER -in BaltimoreCyberTrustRoot.crt -text -out /etc/root.crt
cp pgbouncer.ini /etc/pgbouncer/pgbouncer.ini
sed -i "s/SERVERNAME/$SERVERNAME/g" /etc/pgbouncer/pgbouncer.ini
service pgbouncer restart
update-rc.d pgbouncer defaults
netstat -tulpn | grep "pgbouncer"