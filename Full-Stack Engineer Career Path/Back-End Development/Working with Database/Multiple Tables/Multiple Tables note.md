## JOIN
- `JOIN` will combine rows from different tables if the join condition is true.

```sql
SELECT orders.order_id,
   customers.customer_name
FROM orders
JOIN customers
  ON orders.customer_id = customers.customer_id;
```

## LEFT JOIN
- `LEFT JOIN` will return every row in the left table, and if the join condition is not met, `NULL` values are used to fill in the columns from the right table.

```sql
SELECT *
FROM table1
LEFT JOIN table2
  ON table1.c2 = table2.c2;
```

---
## Primary key vs Foreign key
- *Primary key* is a column that serves a unique identifier for the rows in the table.
  - None of the values can be `NULL`.
  - Each value must be unique (i.e., you can’t have two customers with the same customer_id in the customers table).
  - A table can not have more than one primary key column.

- *Foreign key* is a column that contains the primary key to another table.

---
## CROSS JOIN
- `CROSS JOIN` lets us combine all rows of one table with all rows of another table.

```sql
SELECT shirts.shirt_color,
   pants.pants_color
FROM shirts
CROSS JOIN pants;
```

## UNION
- `UNION` stacks one dataset on top of another.
- Tables must have the same number of columns.
- The columns must have the same data types in the same order as the first table.

```sql
SELECT *
FROM table1
UNION
SELECT *
FROM table2;
```

## WITH
- `WITH` allows us to define one or more temporary tables that can be used in the final query.
-  one of the tables is the result of another calculation.

```sql
ITH previous_query AS (
  SELECT customer_id,
   COUNT(subscription_id) AS 'subscriptions'
FROM orders
GROUP BY customer_id 
)
SELECT customers.customer_name, previous_query.subscriptions
FROM previous_query JOIN customers 
ON previous_query.customer_id = customers.customer_id
```
