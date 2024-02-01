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

---
# Intermediate Index
## Partial Index
- Many times companies have two sets of users in their databases, internal and external users.
- If you were trying to get information about your internal employees, searching through all 70 million records would be a waste when you are looking for a group of users making up about 0.37% of the total.
- A partial index allows for indexing on a subset of a table, allowing searches to be conducted on just this group of records in the table.
```sql
CREATE INDEX users_user_name_internal_idx ON users (user_name)
WHERE email_address LIKE '%@wellsfargo.com';
```

## Order By
-  you can add Order By to the index itself and PostgreSQL will store the data in your desired order.
-  You won’t need a second step of sorting them, saving time on your query.
```sql
CREATE INDEX logins_date_time_idx ON logins (date_time DESC, user_name);
```
- If your column contains NULLs you can also specify the order they appear by adding NULLS FIRST or NULLS LAST to fit your needs.
- By default, PostgreSQL orders indexes by ascending order with NULLs last

## Primary Keys and Indexes
- PostgreSQL automatically creates a unique index on any primary key you have in your tables.
- It will also do this for any column you define as having a unique constraint.

## Clustered Index
- all indexes are either a clustered index or a non-clustered index.
- A clustered index is often tied to the table’s primary key.
- When a clustered index is created for a table, the data is physically organized in the table structure to allow for improved search times.
- Similar to alphabetical order in a dictionary
- PostgreSQL does differently than other systems is that it does not maintain this order automatically.
- If you want to maintain the order, you must run the `CLUSTER` command again on the index when there have been changes. This will “re-cluster” the index to put all of those new records in the correct place.
- Because PostgreSQL does not automatically recluster on INSERT, UPDATE and DELETE statements, those statements might run faster than equivalent statements using a different system.
<br>
To cluster your database table using an existing index (say products_product_name_idx) on the products table you would use:
```sql
CLUSTER products USING products_product_name_idx;
```
If you have already established what index should be clustered on you can simply tell the system which table to apply the cluster on.
```sql
CLUSTER products;
```
 if you want to cluster every table in your database that has an identified index to use you can simply call
 ```sql
CLUSTER;
```

### Non-Clustered Index
- All other than clustered index are non-clustered indexes
- Non-clustered indexes have records of the columns they are indexing and a pointer back to the actual data in the table.
- You have a key that is sorted and a pointer to where to find the rest of the data if needed.

#### Index-Only Scans
Let’s examine the following multicolumn index.
```sql
CREATE INDEX customers_idx ON customers (last_name, first_name);
```
- This will improve the speed when searching for customers by last_name and first_name.
- What happens when we frequently want to know the customers email_address as well?
- For each record found, it will use the index to find a pointer then look up the email_address matched to that record found in the index to return the last_name, first_name, and email_address.
- If you include the information that is regularly looked for, even if it isn’t used in the filtering, as part of the index, a secondary search can be avoided.
- So in this example, you could add email_address as another column in the index to prevent the lookup step.

#### Indexes Based On Expressions
- For example, if you want to ensure the company_name in a manufactures table is unique, you can add the `UNIQUE` option to make a unique index constraint on the results on your index.
- In PostgreSQL, 'ExampleCompany' is NOT the same thing as 'examplecompany' even though we would probably want to reject this as a duplicate.

```sql
CREATE UNIQUE INDEX unique_manufacture_company_name_idx ON manufacture(LOWER(company_name));
```

