-- 14. Create a SQL script or secure administrative endpoint to create a MySQL user named store_manager and grant the following permissions on all tables: (0.5 Grade)
-- ● SELECT
-- ● INSERT
-- ● UPDATE
CREATE USER store_manager WITH PASSWORD 'password123';

GRANT SELECT, INSERT, UPDATE
ON ALL TABLES IN SCHEMA public
TO store_manager;
-- 15. Revoke the UPDATE permission from “store_manager”. (0.5 Grade)
REVOKE UPDATE
ON ALL TABLES IN SCHEMA public
FROM store_manager;
-- 16. Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)
GRANT DELETE
ON TABLE sales
TO store_manager;

-- SELECT grantee, privilege_type, table_name
-- FROM information_schema.role_table_grants
-- WHERE grantee = 'store_manager';







