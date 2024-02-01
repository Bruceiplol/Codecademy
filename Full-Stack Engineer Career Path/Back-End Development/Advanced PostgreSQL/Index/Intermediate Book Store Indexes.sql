#Existing Structure
SELECT * FROM customers LIMIT 10;
SELECT * FROM orders LIMIT 10;
SELECT * FROM books  LIMIT 10;

SELECT * FROM PG_INDEXES
WHERE tablename in ('customers', 'books', 'orders');

#Partial Index
EXPLAIN ANALYZE SELECT * 
FROM orders
WHERE quantity > 18;

CREATE INDEX order_quantity_over_18_idx ON orders(quantity) WHERE quantity > 18;

EXPLAIN ANALYZE SELECT * 
FROM orders
WHERE quantity > 18;

#Primary Key
ALTER TABLE customers
ADD CONSTRAINT customers_pkey
PRIMARY KEY (customer_id);

SELECT *
FROM pg_indexes WHERE tablename='customers';

EXPLAIN ANALYZE SELECT *
FROM customers
WHERE customer_id < 100;


CLUSTER customers USING customers_pkey;
SELECT * FROM customers LIMIT 10;

#No secondary lookup
REATE INDEX order_customer_id_book_id ON orders(customer_id, book_id);
DROP INDEX IF EXISTS order_customer_id_book_id;
CREATE INDEX order_customer_id_book_id ON orders(customer_id, book_id, quantity);

#Combining Indexes
CREATE INDEX books_author_title_idx ON books(author, title);

#An Ounce of Prevention is worth a Pound of Cure
EXPLAIN ANALYZE SELECT * FROM orders WHERE quantity * price_base > 100;

CREATE INDEX orders_total_price_idx ON orders ((quantity * price_base));

EXPLAIN ANALYZE SELECT * FROM orders WHERE quantity * price_base > 100;






