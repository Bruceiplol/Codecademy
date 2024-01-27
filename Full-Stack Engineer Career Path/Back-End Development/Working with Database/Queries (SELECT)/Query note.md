## SELECT
```sql
SELECT column1, column2 
FROM table_name;
```
- `SELECT` is the clause we use every time we want to query information from a database.
- `*` means all columns
- specify the column names to display only interested columns

## AS
```sql
SELECT name AS 'Titles'
FROM movies;
```
- `AS` renames a column or table.

## DISTINCT
```sql
SELECT DISTINCT tools 
FROM inventory;
```
- `DISTINCT` return unique values. It filters out all duplicate values in the specified column(s).

## WHERE
```sql
SELECT *
FROM movies
WHERE imdb_rating > 8;
```
- `WHERE` lets you filter the results of the query based on conditions that you specify.
- Comparison operators:
  - `=` equal to
  - `!=` not equal to
  - `>` greater than
  - `<` less than
  - `>=` greater than or equal to
  - `<=` less than or equal to

### LIKE
```sql
SELECT * 
FROM movies
WHERE name LIKE 'Se_en';
/*result 'seven', se7en'*/

SELECT * 
FROM movies 
WHERE name LIKE '%man%';
/*result  ‘Batman’ and ‘Man of Steel’ **/
```
- `LIKE` can be a useful operator when you want to compare/filter out similar values.
- `LIKE` is a special operator used with the `WHERE` clause to search for a specific pattern in a column.
- The `_`means you can substitute any individual character here without breaking the pattern.
- `%` is a wildcard character that matches zero or more missing characters in the pattern.
  - `A%` matches all movies with names that begin with letter ‘A’
  - `%a` matches all movies that end with ‘a’

### IS NULL
```sql
/*To filter for all movies with an IMDb rating:*/
SELECT name
FROM movies 
WHERE imdb_rating IS NOT NULL;
```
- Unknown values are indicated by `NULL`.
- We use `IS NULL`, `IS NOT NULL` to represent missing values

### BETWEEN
```sql
SELECT *
FROM movies
WHERE year BETWEEN 1990 AND 1999;

SELECT *
FROM movies
WHERE name BETWEEN 'A' AND 'J';
/*includes 'J' but not 'Jaws'
```
- The `BETWEEN` operator is used in a `WHERE` clause to filter the result set within a certain range.

### AND
```sql
SELECT * 
FROM movies
WHERE year BETWEEN 1990 AND 1999
   AND genre = 'romance';
```
- `AND` combines multiple conditions in a `WHERE` clause to make the result set more specific
- `AND` operator displays a row if all the conditions are true.

### OR
```sql
SELECT *
FROM movies
WHERE year > 2014
   OR genre = 'action';
```
- `OR` operator can also be used to combine multiple conditions in `WHERE` clause
- `OR` operator displays a row if any condition is true.

## ORDER BY
```sql
SELECT *
FROM movies
ORDER BY name; /*from A through Z */

SELECT *
FROM movies
WHERE imdb_rating > 8
ORDER BY year DESC;
```
- `ORDER BY` sorts the result.
- `DESC` is a keyword used in `ORDER BY` to sort the results in descending order (high to low or Z-A).
- `ASC` is a keyword used in `ORDER BY` to sort the results in ascending order (low to high or A-Z).

## LIMIT
```sql
SELECT *
FROM movies
LIMIT 10;
```
- `LIMIT` specifies the maximum number of rows that the query will return.

## CASE
```sql
SELECT name,
 CASE
  WHEN imdb_rating > 8 THEN 'Fantastic'
  WHEN imdb_rating > 6 THEN 'Poorly Received'
  ELSE 'Avoid at All Costs'
 END AS 'Review'
FROM movies;
```
- `CASE` creates different outputs.
- It is SQL’s way of handling if-then logic.
- Each `WHEN` tests a condition and the following `THEN` gives us the string if the condition is true.
- The `ELSE` gives us the string if all the above conditions are false.
- The `CASE` statement must end with END.
- We can rename the column using `AS`
