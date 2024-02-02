### Check Table Size
you can use the following functions to check the size of a relation in a database.
- `pg_total_relation_size` will return the size of the table and all its indexes in bytes. These values are often in the millions or billions and thus hard to read.
- `pg_table_size` and `pg_indexes_size` return the size of the table’s data and table’s indexes in bytes. The sum of these two functions is equal to `pg_total_relation_size`
- `pg_size_pretty` can be used with the functions above to format a number in bytes as KB, MB, or GB.

```sql
SELECT 
    pg_size_pretty(pg_table_size('table_name')) as tbl_size, 
    pg_size_pretty(pg_indexes_size('table_name')) as idx_size,
    pg_size_pretty(pg_total_relation_size('table_name')) as total_size;
```

### Updates and Table Size
- When an UPDATE or DELETE is called, PostgreSQL doesn’t physically delete the content from the disk. Instead, the database engine marks those rows so that they aren’t returned in user queries.
- These rows are called dead tuples, they still occupy space on disk and can affect performance.

### Deletes and Table Size
- a `DELETE` statement will create dead tuples and leave the size of the table unchanged.
```sql
SELECT schemaname, relname, n_dead_tup, n_live_tup
FROM pg_stat_all_tables LIMIT 3
```

## VACUUM
- In PostgreSQL there is an operation called `VACUUM` that can be used to manage storage space.
- Running `VACUUM <table name>;` will vacuum a specific table
- A `VACUUM` statement without a table name will run on the entire database.
- If `VACUUM` cannot clear the dead tuples, PostgreSQL will mark the space occupied by dead tuples for reuse when new data is inserted into the table.

### Analyze and Autovacuum
- PostgreSQL has a feature called `autovacuum` enabled on most databases by default.
- When using autovacuum, PostgreSQL periodically checks for tables that have had a large number of inserted, updated or deleted tuples that could be vacuumed to improve performance.
- When autovacuum is enabled and finds such a table, a `VACUUM ANALYZE` command is run.
  - VACUUM, which manages the dead tuples in a database table
  - ANALYZE, which is a statement that allows PostgreSQL to look at a table and gather information about contents. PostgreSQL then stores this data internally and uses it to ensure that queries are planned in the most efficient way given the structure of the table.
- However, you can also run it yourself with `VACUUM ANALYZE <table name>`;
- You can monitor the last vacuum or autovacuum by querying the table `pg_stat_all_tables` for vacuum and analyze statistics.
```sql
SELECT relname, 
    last_vacuum,
    last_autovacuum, 
    last_analyze
FROM pg_stat_all_tables 
WHERE relname = 'table_name';
```

### Vacuum Full
- `VACUUM FULL` which rewrites all the data from a table into a “new” location on disk and only copies the required data (excluding dead tuples).
- One of the significant drawbacks from VACUUM FULL is that it’s a slow operation that blocks other operations on the table while it’s working.

### Truncate
- Occasionally, you may need to remove all the rows, but retain the structure of a table.
- an unqualified delete — a `DELETE` that affects all rows (e.g. `DELETE * FROM table WHERE true;`). In large tables, an unqualified delete can be quite expensive, as it still requires scanning all rows.
- In these situations, one common solution is to use `TRUNCATE`.
- `TRUNCATE` quickly removes all rows from a table. It has the same effect as an unqualified delete
- `TRUNCATE` runs much faster on large tables.
- `TRUNCATE` simultaneously reclaims disk space immediately, rather than requiring a subsequent VACUUM or VACCUM FULL operation.
