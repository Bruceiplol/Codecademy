# Index
- An index is an organization of the data in a table to help with performance when searching and filtering records.
- A table can have zero, one, or many indexes.
- a table that is fairly stable but is searched regularly might be a good candidate for an index.
- The higher the percentage of a table you are returning the less useful an index becomes.
-  you want to see what indexes exist on your products table you would run the following query:
    ```sql
    SELECT *
    FROM pg_Indexes
    WHERE tablename = 'products';
    ```
- Benefits: boosted search time -- Binary Tree, reading time: log_2^n = n
- we can investigate the query by adding `EXPLAIN ANALYZE` before your query.
  - `EXPLAIN ANALYZE SELECT * FROM customers WHERE first_name = 'David';`

- To see the size of a database table you can run the script
  ```sql
  SELECT pg_size_pretty (pg_total_relation_size('<table_name>'));
  ```

### Build an Index
```sql
CREATE INDEX customers_user_name_idx ON customers (user_name);
```
##### Cost
- it comes at the cost of increased runtime for any modification to the table data impacting the user_name column.
- Indexes speed up searching and filtering, however, they slow down insert, update, and delete statements.
- Another cost is the space that the index takes up. The index data structures can sometimes take up as much space as the table itself.

### Index Filtering
- If an index is created on the columns referenced in these clauses, the database server will examine the index to see if it will improve the speed of the query.
- Much like constraints, you can combine multiple columns together as a single index.
- The index is built in the specific order listed at creation, so (last_name, first_name) is different from (first_name, last_name).
    ```sql
    CREATE INDEX customers_last_name_first_name_idx ON customers (last_name, first_name);
    ```
  
### Drop an Index
```sql
DROP INDEX IF EXISTS customers_city_idx;
```


    
