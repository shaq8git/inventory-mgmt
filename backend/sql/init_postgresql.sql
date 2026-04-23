CREATE DATABASE inventory_mgmt;

\connect inventory_mgmt;

CREATE USER inventory_app WITH PASSWORD 'inventory_app_password';
GRANT ALL PRIVILEGES ON DATABASE inventory_mgmt TO inventory_app;
GRANT ALL ON SCHEMA public TO inventory_app;

ALTER DATABASE inventory_mgmt OWNER TO inventory_app;
