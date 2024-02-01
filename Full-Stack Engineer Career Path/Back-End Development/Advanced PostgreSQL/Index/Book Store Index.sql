#Existing Structure
SELECT * FROM customers LIMIT 10;
SELECT * FROM orders LIMIT 10;
SELECT * FROM books LIMIT 10;

SELECT * FROM pg_indexes WHERE tablename = 'customers';
SELECT * FROM pg_indexes WHERE tablename = 'books';
SELECT * FROM pg_indexes WHERE tablename = 'orders';

#Create Indexes
CREATE INDEX customer_id_idx ON orders(customer_id);
CREATE INDEX book_id_idx ON orders(book_id);

#Is a Multicolumn Index good here?
EXPLAIN ANALYZE SELECT original_language, title, sales_in_millions FROM books  WHERE original_language  = 'French';

SELECT pg_size_pretty (pg_total_relation_size('books'));

CREATE INDEX language_idx ON books(original_language, title, sales_in_millions);

EXPLAIN ANALYZE SELECT original_language, title, sales_in_millions FROM books  WHERE original_language  = 'French';

SELECT pg_size_pretty (pg_total_relation_size('books'));

#Clean up
DROP INDEX IF EXISTS language_idx;



