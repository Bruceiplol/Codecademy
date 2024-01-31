# Constraints
- to maintain data integrity
- Constraints are rules defined as part of the data model to control what values are allowed in specific columns and tables.
- Reject inserts or updates containing values that shouldn’t be inserted into a database table, which can help with preserving data integrity and quality.
- Raise an error when they’re violated, which can help with debugging applications that write to the DB.

## Data Types

|Name|	Description|
|-----|-----|
|boolean|	true/false|
|varchar or varchar(n)|	text with variable length, up to n characters (if specified)|
|date|	calendar date|
|integer|	whole number value between -2147483648 and +2147483647|
|numeric(a, b)|	decimal with total digits (a) and digits after the decimal point (b)|
|time|	time of day (no time zone)|

## Nullability Constraints
- Missing (`NULL) values in certain columns might make our data much less useful.
- With PostgreSQL, we can choose to reject inserts and updates that don’t include data for specific columns by adding a `NOT NULL constraint on those columns.

```sql
CREATE TABLE talks (
    id integer,
    title varchar NOT NULL,
    speaker_id integer NOT NULL,
    estimated_length integer,
    session_timeslot timestamp NOT NULL
);
```

- we can use `ALTER TABLE` statements to add or remove constraints from existing tables.
```sql
# Add contraint
ALTER TABLE talks
ALTER COLUMN session_timeslot SET NOT NULL;

# Drop contraint
ALTER TABLE talks
ALTER COLUMN session_timeslot DROP NOT NULL
```

## Check Constraints
For example, In our talks table, we might want to ensure that the `estimated_length` column is:
- An integer -- data type
- NOT NULL -- NOT NULL
- Positive -- CHECK

- We can use `CHECK` statements to implement more precise constraints on our table.
- A `CHECK` constraint can be written into a `CREATE TABLE` statement, or added to an existing table with `ALTER TABLE`.
- a `CHECK` statement must be a SQL statement that can be evaluated as either **true or false**.

```sql
ALTER TABLE talks 
ADD CHECK (estimated_length > 0);
```

<br>
Within our check constraint we can:

- Make comparisons between columns within the table
- Use logical operators like `AND` and `OR`
- Use other SQL operators (`IN`, `LIKE`)

<br>

- As a general rule, any logic that you might use in a `WHERE` statement to filter individual rows from an existing table can be applied within a `CHECK`, including logic that involves multiple columns or conditions.

```sql
ALTER TABLE talks
ADD CHECK (estimated_length < 120 AND date_part('year', session_timeslot) = 2020);
```

## Unique Constraints
- To identify values in a single column as unique, we specify `UNIQUE` following the column name and datatype definitions
- A `UNIQUE` constraint can be written into a `CREATE TABLE` statement, or added to an existing table with `ALTER TABLE`.

```sql
ALTER TABLE talks
ADD UNIQUE (speaker_id, session_timeslot)
```

## Primary Keys
- Primary keys are essential to defining these relationships.
- A primary key is a column (or set of columns) that uniquely identifies a row within a database table.
- Uniquely identify that row in the table (like a `UNIQUE` constraint)
- Contain no null values (like a `NOT NULL` constraint)
- Tables are limited to one `PRIMARY KEY`, but not limited in how many columns can have both `UNIQUE` and `NOT NULL` constraints.
- Many joins will use the primary key from one table to join data with another table
- Primary keys can improve query performance
- Primary keys help to enforce data integrity within a table by ensuring that rows can be uniquely identified

```sql
ALTER TABLE attendees
ADD PRIMARY KEY (id);
```

## Foreign Keys
- Referential integrity can be enforced by adding a `FOREIGN KEY` on the child table that references the primary key of a parent table.
- a foreign key constraint will prevent an engineer from deleting or updating a row of a parent table that is referenced by some child table.
  - `CREATE TABLE` statement using `REFERENCES talks (id) ON DELETE RESTRICT` or `REFERENCES talks (id) ON UPDATE RESTRICT`.
- `CASCADE` clauses (`ON UPDATE CASCADE`, `ON DELETE CASCADE`) cause the updates or deletes to automatically be applied to any child tables.

```sql
ALTER TABLE registrations
ADD FOREIGN KEY (talk_id)
REFERENCES talks (id);
```

For example, suppose we’d like to set up our database to automatically unregister attendees from a talk that’s been cancelled. To do this we could apply `ON DELETE CASCADE` to our foreign key constraint.
```sql
ALTER TABLE registrations
ADD FOREIGN KEY (talk_id)
REFERENCES talks (id) ON DELETE CASCADE
```
