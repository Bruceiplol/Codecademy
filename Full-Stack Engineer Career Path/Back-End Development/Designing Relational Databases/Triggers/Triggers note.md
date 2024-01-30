# Triggers
- a database trigger is procedural code that is automatically executed in response to certain events on a particular table or view in a database.
- adding a trigger saves people from forgetting to do that action, and ensures consistent rules are applied.
- You have control over when they get called, when they run, along with what happens when they are called.

```sql
/*a trigger that calls a function when a table is updated.*/
CREATE TRIGGER <trigger_name>
BEFORE UPDATE ON <table_name>
FOR EACH ROW
EXECUTE PROCEDURE<function>;
#(or EXECUTE FUNCTION <FUNCTION>;)
```

### When being Activated
- `BEFORE` and `AFTER`
- It can be set for `UPDATE`, `INSERT`, `DELETE` and `TRUNCATE`.
- `AFTER`is quite useful for logging purposes

### How to trigger
 - When using `FOR EACH ROW`, the trigger will fire and call the function for every row that is impacted by the related query.
 - `FOR EACH STATEMENT` calls the function in the trigger once for each query, not for each record.
   -  If you have a trigger set as `FOR EACH ROW` and calls a small function, this could add up fast.
   -  Real possible logical differences

---
- you can use a `WHEN` clause to filter when a trigger calls its related function
- For example, when total spending gets higher than X you could update the high spenders flag for that client. Similarly, if a client drops below X you could mark that they are no longer considered a high spender.
- with the `WHEN` clause, you can use `NEW` and `OLD` to get records from the table before and after the query.
- `INSERT` can not refer to `OLD` (nothing existed before the insert)
- `DELETE` can not refer to `NEW` (nothing exists after the delete).

```sql
CREATE TRIGGER insert_trigger_high
BEFORE INSERT ON clients
FOR EACH ROW
WHEN (NEW.total_spent >= 1000)
EXECUTE PROCEDURE high_spender();

CREATE TRIGGER insert_trigger_low
BEFORE INSERT ON clients
FOR EACH ROW
WHEN (NEW.total_spent < 1000)
EXECUTE PROCEDURE not_a_high_spender();
```

---
- If a statement causes multiple triggers to fire, they are triggered in alphabetical order.
- No trigger can be set on a `SELECT` statement.

---
### Removing Triggers
```sql
DROP TRIGGER <trigger_name> ON <table_name>;
```

To check:
```sql
SELECT * FROM information_schema.triggers;
```
