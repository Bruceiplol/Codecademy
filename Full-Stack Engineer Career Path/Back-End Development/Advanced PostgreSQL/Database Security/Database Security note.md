## Database Permissions
- When you create a new PostgreSQL database server there will be a single database and a single user (both usually named postgres) available.
- `SELECT current_user;`
- The postgres user (or any initial user) has the ability to create new databases, tables, users, etc
- the term for a user with these types of permissions is `superuser`. A `superuser` bypasses all permission checks that other users face before being allowed to perform an action.
- often named `ccuser`
- you'd want to ensure that:
  - Most user’s privileges are restricted
  - superusers are not performing routine database tasks
  - Specialized roles are created with only the permissions they require

### Investigating Superuser Permissions
- `pg_catalog.pg_roles` — a listing of all users in the database and a description of what special permissions these users have.
- `information_schema.table_privileges` — description of the permissions a user (grantee) has on a table. This table can be used to answer questions about who can `SELECT`, `INSERT`, `UPDATE`, etc. values on a table.

```sql
SELECT grantor, grantee, table_schema, table_name, privilege_type
FROM information_schema.table_privileges 
WHERE grantee = 'userB';
```

-  as a superuser, you can use `SET ROLE` to mimic the permissions of other users.

```sql
SELECT rolname
FROM pg_catalog.pg_roles;

SET ROLE analyst;

SELECT grantee,table_name, privilege_type 
FROM information_schema.table_privileges 
WHERE grantee = 'analyst';

SELECT * FROM event_log WHERE id = 1;
```

### Creating and Modifying Database Roles
- As a superuser, one of the permissions you have is the ability to create new roles.
- In PostgreSQL, roles can either be login roles or group roles.
  - Login roles are used for most routine database activity.
  - Group roles typically do not have the ability to login themselves, but can hold other roles as “members” and allow access to certain shared permissions.
-  You can create a new login role using `CREATE ROLE <name> WITH <list of permissions>`;

```sql
CREATE ROLE sampleusr WITH NOSUPERUSER LOGIN;

ALTER ROLE miriam WITH CREATEDB;
```

|Permission Name	|Function|
|---|---|
|SUPERUSER|	Is the role a superuser?|
|CREATEROLE|	Is the role permitted to create additional roles?|
|CREATEDB|	Is the role able to create databases?|
|LOGIN|	Is the role able to login?|
|IN ROLE|	List of existing roles that a role will be added to as a new member.|

### Modifying Permissions on Existing Schemas and Tables
- As a superuser or table or schema owner, you may use `GRANT` and `REVOKE` statements to modify these permissions at the schema and table level.
- To use a schema, a role must have a permission called `USAGE`.
- Other schema level permissions include `CREATE` and `DROP, which allow the grantee the ability to create or remove tables in that schema respectively.

First by granting USAGE on the schema. In this example, analyst is also granted the ability to CREATE new tables in the schema.
```sql
GRANT USAGE, CREATE ON SCHEMA finance TO analyst;
```

Then by granting the table specific permissions.
```sql
GRANT SELECT, UPDATE ON finance.revenue TO analyst;
```

Reverse: replacing `GRANT` with `REVOKE` and `TO` to `FROM`.
```sql
REVOKE UPDATE ON finance.revenue FROM analyst;
```

### Modifying Default Permissions
-  With default permissions, a superuser can set permissions to be updated automatically when new objects are created in a schema.
-  Default permissions only apply to objects created after the defaults are set, so we still need to ensure the following GRANT statements have given the role access to the schema and the tables that already exist in the schema.

```sql
GRANT USAGE ON finance TO analyst;

GRANT SELECT ON ALL TABLES IN finance TO analyst;
```

- The following statement would allow analyst to SELECT on all newly-created tables in finance immediately after another user has created them
```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA finance
GRANT SELECT ON TABLES TO analyst;
```

### Groups and Inheritance
- As members of a group role, these accounts can inherit certain permissions from the group
- If a superuser granted `SELECT` on a table to the group, members would also be able to `SELECT` on this table
- For security reasons, PostgreSQL disallows the inheritance of certain powerful permissions such as LOGIN, SUPERUSER, CREATEDB, and CREATEROLE.

 Several ways to create a new group role:
 - Using `CREATE ROLE` and the `WITH ROLE` option when creating a role — this automatically adds the listed names to the role.
```sql
CREATE ROLE marketing WITH NOLOGIN ROLE alice, bob;
```
- Using `CREATE ROLE` and a `GRANT` statement — this grants all the permissions of the newly created role to the listed names.
```sql
CREATE ROLE finance WITH NOLOGIN;

GRANT finance TO charlie;
```
- You can also add users to group(s) on creation by specifying `IN ROLE` along with the `CREATE ROLE` statement.
```sql
CREATE ROLE fran WITH LOGIN IN ROLE employees, managers;
```

### Column Level Security
-  PostgreSQL offers the ability to write `GRANT` statements that specify specific columns for a set of permissions to apply to.
```sql
GRANT SELECT (project_code, project_name, project_status) 
ON projects to employees;
```
- With these permissions in place, when a member of employees attempts to SELECT on projects, the server checks if they have access to all the requested columns.
- because * includes budget_target, a column that employees doesn’t have access to => return permission denied

### Row Level Security
- PostgreSQL has a feature called Row-level security (RLS) that allows developers to define permissions on individual rows.

 First, we create a policy using a CREATE POLICY statement.
 ```sql
CREATE POLICY emp_rls_policy ON accounts FOR SELECT 
TO sales USING (salesperson=current_user);
```
- Creates a RLS policy `ON` a table (`accounts`) and specifies the permissions type the policy applies to.
- Specifies the role (`sales`) this policy applies to using `TO <role name>`.
- Specifies the condition to check before permitting a user to carry out an action. In this example, the policy is that the `current_user` must equal the value in that row’s `salesperson` column.

The result of this statement is now we have an inactive policy named “emp_rls_policy”. Next, we need to enable RLS on the table the policy refers to.
```sql
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
```
