/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

package com.microsoft.azure.postgresql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * This sample demonstrates how to connect to an Azure Database for PostgreSQL and how to
 * use SQL statements to query, insert, update, and delete data in the database.
 */

public class ConnectAndQueryData {
    static String host;
    static String database;
    static String user;
    static String password;

    private static Connection InitializeConnection() throws Exception {
        // check that the driver is installed
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new ClassNotFoundException("PostgreSQL JDBC driver NOT detected in library path.", e);
        }

        System.out.println("PostgreSQL JDBC driver detected in library path.");

        Connection connection = null;

        // Initialize connection object
        try {
            String url = String.format("jdbc:postgresql://%s/%s", host, database);

            // set up the connection properties
            Properties properties = new Properties();
            properties.setProperty("user", user);
            properties.setProperty("password", password);
            properties.setProperty("ssl", "true");

            // get connection
            connection = DriverManager.getConnection(url, properties);
        } catch (SQLException e) {
            throw new SQLException("Failed to create connection to database.", e);
        }

        if (connection != null) {
            System.out.println("Successfully created connection to database.");
        } else {
            System.out.println("Failed to create connection to database.");
        }

        return connection;
    }

    private static void CreateTableInsertRows(Connection connection) throws Exception {
        if (connection != null) {
            // Perform some SQL queries over the connection.
            try {
                // Drop previous table of same name if one exists.
                Statement statement = connection.createStatement();
                statement.execute("DROP TABLE IF EXISTS inventory;");
                System.out.println("Finished dropping table (if existed).");

                // Create table.
                statement.execute("CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);");
                System.out.println("Created table.");

                // Insert some data into table.
                int nRowsInserted = 0;
                PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO inventory (name, quantity) VALUES (?, ?);");
                preparedStatement.setString(1, "banana");
                preparedStatement.setInt(2, 150);
                nRowsInserted += preparedStatement.executeUpdate();

                preparedStatement.setString(1, "orange");
                preparedStatement.setInt(2, 154);
                nRowsInserted += preparedStatement.executeUpdate();

                preparedStatement.setString(1, "apple");
                preparedStatement.setInt(2, 100);
                nRowsInserted += preparedStatement.executeUpdate();
                System.out.println(String.format("Inserted %d row(s) of data.", nRowsInserted));

                // NOTE No need to commit all changes to database, as auto-commit is enabled by default.

            } catch (SQLException e) {
                throw new SQLException("Encountered an error when executing given sql statement.", e);
            }
        }
    }

    private static void ReadTable(Connection connection) throws Exception {
        if (connection != null) {
            // Perform some SQL queries over the connection.
            try {
                Statement statement = connection.createStatement();
                ResultSet results = statement.executeQuery("SELECT * from inventory;");
                while (results.next()) {
                    String outputString =
                        String.format(
                            "Data row = (%s, %s, %s)",
                            results.getString(1),
                            results.getString(2),
                            results.getString(3));
                    System.out.println(outputString);
                }
            } catch (SQLException e) {
                throw new SQLException("Encountered an error when executing given sql statement.", e);
            }
        }
    }

    private static void UpdateTable(Connection connection) throws Exception {
        if (connection != null) {
            // Perform some SQL queries over the connection.
            try {
                // Modify some data in table.
                int nRowsUpdated = 0;
                PreparedStatement preparedStatement = connection.prepareStatement("UPDATE inventory SET quantity = ? WHERE name = ?;");
                preparedStatement.setInt(1, 200);
                preparedStatement.setString(2, "banana");
                nRowsUpdated += preparedStatement.executeUpdate();
                System.out.println(String.format("Updated %d row(s) of data.", nRowsUpdated));

                // NOTE No need to commit all changes to database, as auto-commit is enabled by default.
            } catch (SQLException e)
            {
                throw new SQLException("Encountered an error when executing given sql statement.", e);
            }
        }
    }

    private static void DeleteTable(Connection connection) throws Exception {
        if (connection != null) {
            // Perform some SQL queries over the connection.
            try {
                // Delete some data from table.
                int nRowsDeleted = 0;
                PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM inventory WHERE name = ?;");
                preparedStatement.setString(1, "orange");
                nRowsDeleted += preparedStatement.executeUpdate();
                System.out.println(String.format("Deleted %d row(s) of data.", nRowsDeleted));

                // NOTE No need to commit all changes to database, as auto-commit is enabled by default.
            } catch (SQLException e) {
                throw new SQLException("Encountered an error when executing given sql statement.", e);
            }
        }
    }

    /**
     * Main entry point.
     * @param args the parameters
     */
    public static void main(String[] args) {
        try {
            // Initialize connection variables.
            host = System.getenv("PostgreSQL_HOST");
            database = System.getenv("PostgreSQL_DATABASE");
            user = System.getenv("PostgreSQL_USER");
            password = System.getenv("PostgreSQL_PASSWORD");

            Connection connection = InitializeConnection();

            CreateTableInsertRows(connection);
            ReadTable(connection);
            UpdateTable(connection);
            DeleteTable(connection);

            System.out.println("Execution finished.");

        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }
}