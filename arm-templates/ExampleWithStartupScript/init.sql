-- Initialization Script 

-- Create database
CREATE DATABASE mydb;

-- Switch to the newly created database
\c mydb

-- Create new user
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypass';

-- Grant permissions for new user on the new database
GRANT all privileges ON DATABASE mydb TO myuser;

-- Create Tables
CREATE TABLE products (
    product_no integer,
    product_name text,
    product_price numeric
);

-- Load data 
INSERT INTO products (product_no, product_name, product_price) VALUES
    (1, 'Cheese', 9.99),
    (2, 'Bread', 1.99),
    (3, 'Milk', 2.99);

-- create extensions
-- List of supported Extensions : https://docs.microsoft.com/en-us/azure/postgresql/concepts-extensions
CREATE EXTENSION IF NOT EXISTS orafce;