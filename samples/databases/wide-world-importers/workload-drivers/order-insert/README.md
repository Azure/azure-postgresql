# Workload Driver for Order Insertion in wide_world_importers_pg for PostgreSQL

This application simulates an order insertion workload for the wide_world_importers_pg sample database.

### Contents

[About this sample](#about-this-sample)<br/>
[Before you begin](#before-you-begin)<br/>
[Running the sample](#run-this-sample)<br/>
[Sample details](#sample-details)<br/>
[Disclaimers](#disclaimers)<br/>
[Related links](#related-links)<br/>


<a name=about-this-sample></a>

## About this sample

<!-- Delete the ones that don't apply -->
1. **Applies to:** PostgreSQL
1. **Key features:** Core database features
1. **Workload:** OLTP
1. **Programming Language:** C#
1. **Authors:** Greg Low, Jos de Bruijn, Modified by Steven Schneider to adapt to PostgreSQL.
1. **Update history:** 22 June 2017 - initial revision

<a name=before-you-begin></a>

## Before you begin

To run this sample, you need the following prerequisites.

**Software prerequisites:**

<!-- Examples -->
1. PostgreSQL Instance. Tested on Postgres 9.6 using Azure Database for PostgreSQL. Expected to work on all recent versions of PostgreSQL.
2. Visual Studio 2015 or greater. This project uses the [Npgsql ADO.NET Data Provider for PostgreSQL](http://www.npgsql.org/).
3. The wide_world_importers_pg database.

<a name=run-this-sample></a>

## Running the sample

1. Open the solution file MultithreadedOrderInsertWorkload.sln in Visual Studio.

2. Build the solution.

3. Run the app.

## Sample details

This application is used to provide an intensive order entry workload for the wide_world_importers_pg database. When started it displays the following:

![Alt text](/media/wide-world-importers-order-insert-app.png "wide_world_importers_pg Order Insert Workload Simulation")

Ensure that the connection string is set appropriately. It is saved when the program exits. If you ever need to set it back to the default value, open the program, clear the string, and exit the program. When you restart the program, the connection string will have been returned to the default value.

The program uses the selected number of threads to concurrently call the `website.insert_customer_order` function.

When inserts are occurring, click the button to stop but allow time for the system to respond and stop. It may take a few seconds to respond, particularly if a larger number of threads is being used.


<a name=disclaimers></a>

## Disclaimers
The code included in this sample is not intended to be used for production purposes.

<a name=related-links></a>
