#Who's Here?
SELECT rolname FROM pg_roles;

SELECT * FROM pg_roles;

SELECT current_role;

#Adding a Publisher
CREATE ROLE abc_open_data WITH LOGIN NOSUPERUSER;

CREATE ROLE publishers WITH NOSUPERUSER ROLE abc_open_data;

#Granting a Publisher Access to Analytics
GRANT USAGE ON SCHEMA analytics TO publishers;
GRANT SELECT ON ALL TABLES IN SCHEMA analytics TO publishers;

SELECT * FROM information_schema.table_privileges
WHERE grantee = 'publishers';

SET ROLE abc_open_data;
SELECT * FROM analytics.downloads limit 10;
SET ROLE ccuser;

#Granting a Publisher Access to Dataset Listings
SELECT * FROM directory.datasets LIMIT 5;

GRANT USAGE ON SCHEMA directory TO publishers;
GRANT SELECT (id, create_date, hosting_path, src_size, publisher) ON directory.datasets TO publishers;

SET ROLE abc_open_data;
SELECT id, publisher, hosting_path, data_checksum FROM directory.datasets;
SET ROLE ccuser;

#Adding Row Level Security on Downloads Data
CREATE POLICY policy_abc ON analytics.downloads 
FOR SELECT TO publishers USING (owner=current_user);
 
ALTER TABLE analytics.downloads ENABLE ROW LEVEL SECURITY;

SET ROLE abc_open_data;

SELECT * FROM analytics.downloads limit 10;





