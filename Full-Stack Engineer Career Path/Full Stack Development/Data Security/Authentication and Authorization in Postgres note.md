## Host-Based Authentication
- `pg_hba.conf`, a file that configures host-based authentication in Postgres.
- The `pg_hba.conf` file allows you to specify rules for how Postgres should handle different connections.
- In the `pg_hba.conf file`, all the entries follow the same basic format, with blank lines or lines beginning with a # symbol being ignored.
- The basic format of entries is:
```
connection_type  db  user  address  auth_method  [auth_options]
```
<br>
Example:<br>
we’ll be building will allow SSL connections to a database called `db_example` for members of the `g_example` group on the same network as the server and use sha-256 password authentication.

```
hostssl  db_example  +g_example  samenet  scram-sha-256
```

- connection_type will be `hostssl`, which matches external connections that use SSL.
  - `host` is like `hostssl`, but matches connections that don’t use SSL as well.
- `db` will be `db_example`.
  - The keyword `all` can be used to match all databases.
- `user` will be `+g_example`.
  - The `+` matches users who are members of this group, rather than the group itself.
  - If we were creating a rule for a specific user, we would omit the `+`.
  - The keyword `all` can be used to match all users.
- `address` will be `samenet`, a shorthand for connections on the same subnet as the server. Specific IP addresses can be put here as well.
  - The keyword `all` can be used to match any address.
- `auth_method` will be `scram-sha-256`.
  - There are other options, including `reject`, which unconditionally rejects connections matching the rule.
- We’ll leave `auth-options` blank.
- To ensure that all external connections we don’t specifically allow are blocked: `host all all all reject`

## User and Role Management
- create a system that uses three types of roles: permissions, groups, and users.
  - Permissions will determine privileges based on tasks, such as reading and writing to a given table.
  - Groups will be collections of permissions, and represent a group of users.
  - Users represent specific people or applications, and join groups based on what their job is.
- `CREATE ROLE` and `GRANT`
  - CREATE ROLE follows the format: `CREATE ROLE role_name;` (such as SUPERUSER/NOSUPERUSER)
  - GRANT follows two formats:
    - `GRANT PERMISSION ON table TO role;`: is used for granting permissions; if we wanted to allow the `p_example` role to select on the `example` table, we would use `GRANT SELECT ON example TO p_example;`.
    - `GRANT role TO other_role;`: is used to assign one role to another role; if we wanted to give `g_example` all the permissions of `p_example`, we would use `GRANT p_example TO g_example;`.
- More default-deny behavior: We can REVOKE public permissions, so that users require the p_customers_read permission to read the customers table:
  - `REVOKE SELECT ON table FROM PUBLIC;`

## Server Configuration
- Fixing broken authentication and access control, a configuration file called `postgresql.conf`.
- Some of the changes will enforce secure authentication, while others will make it more difficult for an attacker to target the server using automated tools.
- the tools are often configured to scan specific ports that are widely used, such as 21, 22, 80, etc...
- The `listen_addresses` parameter controls what IP addresses are allowed to connect to the server.
  - An IP address that isn’t allowed to connect won’t even be able to try to authenticate.
  - Setting this to '*' allows connections from any address to try and authenticate, but this is generally a bad idea! 
- The `port` parameter is the port the Postgres server listens on.
  - Port numbers `49152`—`65535` aren’t reserved by any software, so a port in this range usually doesn’t conflict with any other software.
- The `ssl` parameter determines whether or not the server will support SSL connections.
  - In a real environment, the server also needs to be provided with the appropriate certificate and key.

```
# some_other_configuration = some_values
listen_addresses = 'localhost, 104.20.25.250'
port = 54831
ssl = on
```
