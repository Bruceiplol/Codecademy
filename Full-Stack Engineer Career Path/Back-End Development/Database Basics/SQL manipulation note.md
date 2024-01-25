## Introduction
```sql
SELECT * FROM celebs;
```
- A relational database is a database that organizes information into one or more tables. Here, the relational database contains one table.
- A *table* is a collection of data organized into rows and columns.Here the table is `celebs`.
- A *column* is a set of data values of a particular type. Here, `id`, `name`, and `age` are the columns.
- A *row* is a single record in a table. The first row in the `celebs` table has: An `id` of `1`, A `name` of `Justin Bieber`, An `age` of `22`

most common data types are:
- `INTEGER`, a positive or negative whole number
- `TEXT`, a text string
- `DATE`, the date formatted as YYYY-MM-DD
- `REAL`, a decimal value

## Statements
- A statement is text that the database recognizes as a valid command. Statements always end in a semicolon `;`.
```sql
CREATE TABLE table_name (
   column_1 data_type, 
   column_2 data_type, 
   column_3 data_type
);
```
- `CREATE TABLE` is a clause. Clauses perform specific tasks in SQL. clauses are written in capital letters. Clauses can also be referred to as commands.
- `table_name` refers to the name of the table that the command is applied to.
- `(column_1 data_type, column_2 data_type, column_3 data_type)` is a parameter. A parameter is a list of columns, data types, or values

### Create
```sql
CREATE TABLE celebs (
   id INTEGER, 
   name TEXT, 
   age INTEGER
);
```
- use the `CREATE` statement to create a new table named `celebs`
- `(id INTEGER, name TEXT, age INTEGER)` is a list of parameters defining each column, or attribute in the table and its data type 
  - `id` is the first column in the table. It stores values of data type `INTEGER`
  - `name` is the second column in the table. It stores values of data type `TEXT`
  - `age` is the third column in the table. It stores values of data type `INTEGER`

### Insert
```sql
INSERT INTO celebs (id, name, age) 
VALUES (1, 'Justin Bieber', 29);
```
- The `INSERT` statement inserts a new row (record_ into a table.
- `INSERT INTO` is a clause
- `(id, name, age)` is a parameter identifying the columns that data will be inserted into.
- `VALUES` is a clause that indicates the data being inserted.
- `(1, 'Justin Bieber', 29)` is a parameter identifying the values being inserted.

### Select
```sql
SELECT name FROM celebs;
```
- `SELECT` is a clause that indicates that the statement is a query.
- `name` specifies the column to query data from.
- `FROM celebs` specifies the name of the table to query data from.
- `*` is a special wildcard character that selects every column in a table

### Alter
```sql
ALTER TABLE celebs 
ADD COLUMN twitter_handle TEXT;
```
- `ALTER TABLE` is a clause that lets you make the specified changes.
- `celebs` is the name of the table that is being changed.
- `ADD COLUMN` is a clause that lets you add a new column to a table
- `twitter_handle` is the name of the new column being added
- `TEXT` is the data type for the new column
- `NULL(∅)` is a special value in SQL that represents missing or unknown data.

### Update
```sql
UPDATE celebs 
SET twitter_handle = '@taylorswift13' 
WHERE id = 4; 
```
- `UPDATE` `celebs` is a clause that edits a row in the table named `celebs`
- `SET` is a clause that indicates the column to edit.
- `@taylorswift13` is the new value that is going to be inserted into the `twitter_handle` column.
- `WHERE` is a clause that indicates which row(s) to update with the new column value

### Delete
```sql
DELETE FROM celebs 
WHERE twitter_handle IS NULL;
```
- `DELETE FROM` is a clause that lets you delete rows from a table.
- `WHERE` is a clause that lets you select which rows you want to delete.
- `IS NULL` is a condition in SQL that returns true when the value is `NULL` and false otherwise.

### Constraints
- Constraints that add information about how a column can be used are invoked after specifying the data type for a column.
- They can be used to tell the database to reject inserted data that does not adhere to a certain restriction.

```sql
CREATE TABLE celebs (
   id INTEGER PRIMARY KEY, 
   name TEXT UNIQUE,
   date_of_birth TEXT NOT NULL,
   date_of_death TEXT DEFAULT 'Not Applicable'
);
```
- `PRIMARY KEY` columns can be used to uniquely identify the row.
- `UNIQUE` columns have a different value for every row. This is similar to `PRIMARY KEY` except a table can have many different `UNIQUE` columns.
- `NOT NULL` columns must have a value.
- `DEFAULT` columns take an additional argument that will be the assumed value for an inserted row if the new row does not specify a value for that column.
