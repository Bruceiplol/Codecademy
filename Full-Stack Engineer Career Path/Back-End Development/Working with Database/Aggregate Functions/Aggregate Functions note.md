## COUNT
- `COUNT()`: count the number of rows

```sql
SELECT COUNT(*) FROM fake_apps
WHERE price = 0
```

## SUM
- `SUM()`: the sum of the values in a column

```sql
SELECT SUM(downloads)
FROM fake_apps;
```

## MAX/MIN
- `MAX()`/`MIN()`: the largest/smallest value

```sql
/*Most Expensive*/
SELECT MAX(price)
FROM fake_apps;

/*Cheapest*/
SELECT MIN(price)
FROM fake_apps;
```

## AVG
- `AVG()`: the average of the values in a column
```sql
SELECT AVG(price)
FROM fake_apps;
```

## ROUND
- `ROUND()`: round the values in the column
- `ROUND()` function takes two arguments inside the parenthesis:
  - a column name
  - an integer (0,1 also represent 1 decimal)

```sql
/*Query for two columns*/
SELECT name, ROUND(price, 0)
FROM fake_apps;

/*Query for the average rounded result to 2 decimals*/
SELECT ROUND (AVG(price), 2)
from fake_apps
```

## GROUP BY
- `GROUP BY` to calculate an aggregate for data with certain characteristics
- used in collaboration with the `SELECT` statement to arrange identical data into groups.
- The `GROUP BY` statement comes after any `WHERE` statements, but before `ORDER BY` or `LIMIT`.

```sql
SELECT category, SUM(downloads)
FROM fake_apps
GROUP BY category
ORDER BY SUM(downloads) DESC;
```

> However, this query may be time-consuming to write and more prone to error.
- SQL lets us use column reference(s) in our `GROUP BY` that will make our lives easier.
  - `1` is the first column selected
  - `2` is the second column selected
  - `3` is the third column selected
  - and so on.

```sql
SELECT category, price, AVG(downloads) FROM fake_apps
GROUP BY 1, 2;
```

## HAVING
- SQL allows you to filter which groups to include and which to exclude.
- We can’t use `WHERE` here because we don’t want to filter the rows; we want to filter groups.
- `HAVING` is very similar to `WHERE`. In fact, all types of `WHERE` clauses you learned about thus far can be used with `HAVING`.
- `HAVING` statement always comes after `GROUP BY`, but before `ORDER BY` and `LIMIT`.

```sql
SELECT price, ROUND(AVG(downloads)), COUNT(*)
FROM fake_apps
GROUP BY 1
HAVING COUNT(*) >10
ORDER BY price DESC
LIMIT 3;
```
