# MVC Architecture for Full-Stack App
- We will be using PostgreSQL as our database.
```
CREATE TABLE expenses(
    expense_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    price DECIMAL(10, 2) NOT NULL, 
    category VARCHAR(30) NOT NULL, 
    essential BOOLEAN NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL
);
```
1. In the root of the folder, create a .env file.
```node
///.env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_POST=5432
DB_DATABASE=expenses
PORT=8000
```
2. Run `npm install` to install Node package dependencies in the root directory of starting-code and in the starting-code/view folder in two separate terminal windows
3. run `npm run start` in the starting-code and starting-code/view folders

## Tutorial steps
### Step 1: getting started with model and controller
- controllers/index.js: functions allows for querying or manipulating the PostgreSQL database and leverages a CRUD (create, read, update, and delete) API.
- models/database.js: connects our application to the PostgreSQL database.
- models/expense.sql: helps us define the data structure of each collection in our database as well as the name of our database.
- utils/index.js: a function for form field validation.
- server.js: connect and run our Express server with route middlewares.

### Step 2: connecting the Model and Controller
