#1
/*overview*/
SELECT * FROM startups;

#2
/*Calculate the total number of companies in the table.*/
SELECT COUNT(*) FROM startups;

#3
/*Calculate the total value of all companies in the table.*/
SELECT SUM(valuation) FROM startups;

#4
/*Check the highest amount raised by a startup.*/
SELECT MAX(raised) FROM startups;

#5
/*Check the highest amount raised by a startup during ‘Seed’ stage.*/
SELECT MAX(raised) FROM startups
WHERE stage = 'Seed';

#6
/*Check the oldest company in the table.*/
SELECT MIN(founded) FROM startups;

#7
/*Check the average valuation.*/
SELECT AVG(valuation) FROM startups;

#8
/*Check the average valuation in each category.*/
SELECT category, AVG(valuation) FROM startups
GROUP BY 1;

#9
/*Check the average valuation in each category.
  Round the averages to two decimal places.*/
SELECT category, ROUND(AVG(valuation),2) FROM startups
GROUP BY 1;

#10
/*Check the average valuation in each category.
  Round the averages to two decimal places.
  Lastly, order the list from highest averages to lowest.*/
SELECT category, ROUND(AVG(valuation),2) FROM startups
GROUP BY 1
ORDER BY 2 DESC;

#11
/*Check each category with the total number of companies that belong to it.*/
SELECT category, COUNT(*) FROM startups
GROUP BY 1;

#12
/*Check each category with the total number of companies that belong to it.
  Filter the result to only include categories that have more than three companies in them.*/
SELECT category, COUNT(*) FROM startups
GROUP BY 1
HAVING COUNT(*)>3
ORDER BY 2 DESC;

#13
/*Check the average size of a startup in each location*/
SELECT location, AVG(employees) FROM startups
GROUP BY 1;

#14
/*Check the average size of a startup in each location, with average sizes above 500*/
SELECT location, AVG(employees) FROM startups
GROUP BY 1
HAVING AVG(employees) > 500;
