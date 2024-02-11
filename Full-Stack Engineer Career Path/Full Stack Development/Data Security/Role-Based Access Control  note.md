# Role-Based Access Control (RBAC)
- Role-Based Access Control (RBAC) is a way of managing permissions using roles.

### Roles
- A role serves as an layer between permissions and users;
- rather than permissions being granted directly to users, permissions are granted to roles, and then users are assigned roles as appropriate.
- Users can have more than one role
- Rather than trying to manually track and update permissions for every user, you can just manage permissions for roles.

### The Principle of Least Privilege
- users should have only the permissions necessary to accomplish their tasks, and no more.
- For example, most users within an organization won’t need access to their computer’s terminal and therefore should not be able to access it.
- often goes hand-in-hand with default-deny schemas, where privileges are denied by default and must be explicitly granted to be used.

### Designing RBAC
- The Roles: First, we need to make a list of the types of users and groups that exist, specific roles, Types of Groups, an admin role.
- The Permissions: default-deny, type of permissions
