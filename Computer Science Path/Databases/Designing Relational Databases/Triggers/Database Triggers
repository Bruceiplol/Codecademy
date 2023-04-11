SELECT * FROM customers 
ORDER BY customer_id;
 
SELECT * FROM customers_log;

CREATE TRIGGER customer_updated
    BEFORE UPDATE ON customers 
    FOR EACH ROW
    EXECUTE PROCEDURE log_customers_change();

UPDATE customers
SET first_name  = 'Steve'
WHERE last_name = 'Hall';
 
SELECT * FROM customers 
ORDER BY customer_id;
 
SELECT * FROM customers_log;

UPDATE customers
SET years_old = 10
WHERE last_name = 'Hall';

SELECT * FROM customers 
ORDER BY customer_id;
 
SELECT * FROM customers_log;

CREATE TRIGGER customer_insert
    AFTER INSERT ON customers
    FOR EACH STATEMENT
    EXECUTE PROCEDURE log_customers_change();

INSERT INTO customers (first_name,last_name,years_old)
VALUES
    ('Jeffrey','Cook',66),
    ('Arthur','Turner',49),
    ('Nathan','Cooper',72);
 
SELECT * FROM customers
ORDER BY customer_id;
 
SELECT * FROM customers_log;

CREATE TRIGGER customer_min_age
    BEFORE UPDATE ON customers
    FOR EACH ROW
    WHEN (NEW.years_old < 13)
    EXECUTE PROCEDURE override_with_min_age();

UPDATE customers
SET years_old = 12
WHERE last_name = 'Campbell';
 
UPDATE customers
SET years_old = 24
WHERE last_name = 'Cook';

SELECT * FROM customers
ORDER BY customer_id;
 
SELECT * FROM customers_log;

UPDATE customers
SET years_old = 9,
    first_name = 'Dennis'
WHERE last_name = 'Hall';

SELECT * FROM customers
ORDER BY customer_id;
 
SELECT * FROM customers_log;

DROP TRIGGER IF EXISTS customer_min_age ON customers;

SELECT * FROM information_schema.triggers;
