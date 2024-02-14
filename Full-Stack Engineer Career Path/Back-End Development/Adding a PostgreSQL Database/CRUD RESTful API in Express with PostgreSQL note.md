### Building API with Express + PostgreSQL all-in-one Link: <br>
https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

---
## RESTful API
- Representational State Transfer (REST) defines a set of standards for web services.
- a RESTful API is an API that conforms to the REST architectural style and constraints.

### CRUD API
- CRUD operations — `GET`, `POST`, `PUT`, and `DELETE`
  - Create: Use the `HTTP POST` method to create a resource in a REST environment
  - Read: Use the `GET` method to read a resource, retrieving data without altering it
  - Update: Use the `PUT` method to update a resource
  - Delete: Use the `DELETE` method to remove a resource from the system

---
### `psql`:
- `-h` or `--host=HOSTNAME`: The database server host or socket directory; the default is `local socket`
- `-p` or `--port=PORT`: The database server port; the default is `5432`
- `-U` or `--username=USERNAME`: The database username; the default is `your_username`
- `-w` or `--no-password`: Never prompt for password
- `-W` or `--password`: Force password prompt, which should happen automatically

#### default postgres database:
```
psql postgres
```

#### check info
```
postgres=# \conninfo
You are connected to database "postgres" as user "your_username" via socket in "/tmp" at port "5432".
```

#### open a sql file:
```
psql -U postgres -d <database_name> -f <file_name.sql>
```

### commands 
- `\q`: Exit psql connection
- `\c`: Connect to a new database
- `\dt`: List all tables
- `\du`: List all roles
- `\list`: List databases

---
## Creating a role in Postgres
First, we’ll create a role called `me` and give it a password of `password`. A role can function as a user or a group.

```
postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
```

We want me to be able to create a database:
```
postgres=# ALTER ROLE me CREATEDB;
```

You can run \du to list all roles and users:
```
me          | Create DB                           | {}
postgres    | Superuser, Create role, Create DB   | {}
```

Now, we want to create a database from the me user. Exit from the default session with `\q` for quit:
```
postgres=# \q
```

We’re back in our computer’s default terminal connection. Now, we’ll connect postgres with me:
```
psql -d postgres -U me
```

## Creating a database in Postgres
We can create a database with the SQL command as follows:
```
postgres=> CREATE DATABASE api;
```

Use the \list command to see the available databases:
```
Name    |    Owner    | Encoding |   Collate   |    Ctype    |
api     | me          | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

Let’s connect to the new api database with me using the \c connect command:
```
postgres=> \c api
You are now connected to database "api" as user "me".
api=>
```

## Creating a table in Postgres
Finally, in the `psql` command prompt, we’ll create a table called `users` with three fields, two `VARCHAR` types, and an auto-incrementing `PRIMARY KEY` ID:
```
api=>
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);
```

---
## Setting up an Express server
We’ll want to install Express for the server and node-postgres to connect to PostgreSQL:
```
npm i express pg
```

---
## Connecting to a Postgres database from Node.js
```js
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
```

---
## Creating routes for CRUD operations
- `GET`: `/` | `displayHome()`
- `GET`: `/users` | `getUsers()`
- `GET`: `/users/:id` | `getUserById()`
- `POST`: `/users` | `createUser()`
- `PUT`: `/users/:id` | `updateUser()`
- `DELETE`: `/users/:id` | `deleteUser()`

### `GET`
In *index.js*, we made an `app.get()` for the root endpoint with a function in it. <br>

Now, in *queries.js*:
#### `GET` all users
```js
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
```
#### `GET` a single user by ID
```js
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
```

### `POST` a new user
```js
const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}
```

### `PUT` updated data in an existing user
```js
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
```

### `DELETE` a user
```js
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
```

### Exporting CRUD functions in a REST API
```js
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
```


