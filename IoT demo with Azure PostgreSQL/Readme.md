Download the sample Node.js project from https://github.com/Azure-Samples/azure-iot-samples-node/archive/master.zip and extract the ZIP archive.
# Quickstart: Send telemetry from a device to an IoT hub to Azure Database for PostgreSQL 

![alt text](https://github.com/savjani/azure-postgresql/blob/master/IoT%20demo%20with%20Azure%20PostgreSQL/Images/IotTelemetry.png "IoT hub telemetry to Azure Database for PostgreSQL")

IoTHub is an Azure service that enables you to ingest high volumes of telemetry from your IoT devices into the cloud for storage or processing. PostgreSQL is an established open source database with strong native JSON capabilities, and the plv8 extension further enhances JSON processing capabilities by integrating the JavaScript v8 engine with SQL. Azure Database for PostgreSQL with plv8 extension can be leveraged as persistent layer for IoT telemetry stream for storage, processing and reporting. 
In this QuickStart, you send telemetry from a simulated device application, through IoT Hub, to Azure Database for PostgreSQL where you store, process and analyze the telemetry information. 
The QuickStart uses Node.js applications to send telemetry to IoTHub. Before you run the application, you create an IoT hub and register a device with the hub.

[!INCLUDE [cloud-shell-try-it.md](../../includes/cloud-shell-try-it.md)]

If you don’t have an Azure subscription, create a [free account](https://azure.microsoft.com/free/?WT.mc_id=A261C142F) before you begin.

## Prerequisites
The sample application to simulate device telemetry is written using Node.js. You need Node.js v4.x.x or later on your development machine. You can download Node.js for multiple platforms from [nodejs.org](https://nodejs.org).

You can verify the current version of Node.js on your development machine using the following command:

```cmd/sh
node --version
```
Download the sample Node.js project from https://github.com/Azure-Samples/azure-iot-samples-node/archive/master.zip and extract the ZIP archive.

## Create an IoT hub
Use the [Azure Portal to create IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal).
