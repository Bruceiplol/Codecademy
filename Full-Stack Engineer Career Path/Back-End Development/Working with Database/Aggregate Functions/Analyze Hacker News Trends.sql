#1
SELECT title, score FROM hacker_news
ORDER BY score DESC
LIMIT 5;

#2
SELECT SUM(score) FROM hacker_news;

#3
SELECT user, SUM(score) FROM hacker_news
GROUP BY 1
HAVING SUM(score)>200
ORDER BY 2 DESC;

#4
SELECT (517 + 309 + 304 + 282) / 6366.0;

#5
SELECT user, COUNT(*) FROM hacker_news
WHERE url LIKE '%watch?v=dQw4w9WgXcQ%'
GROUP BY 1
ORDER BY 2 DESC;

#6
SELECT CASE
  WHEN url LIKE '%github.com%' THEN 'GitHub'
  WHEN url LIKE '%medium.com%' THEN 'Medium'
  WHEN url LIKE '%nytimes.com%' THEN 'New York Times'
  ELSE 'Other'
END AS 'Source'
FROM hacker_news;

#7
SELECT CASE
  WHEN url LIKE '%github.com%' THEN 'GitHub'
  WHEN url LIKE '%medium.com%' THEN 'Medium'
  WHEN url LIKE '%nytimes.com%' THEN 'New York Times'
  ELSE 'Other'
END AS 'Source',
COUNT(*)
FROM hacker_news
GROUP BY 1;

#8
SELECT timestamp FROM hacker_news
LIMIT 10;

#9
SELECT timestamp, strftime('%H', timestamp)
FROM hacker_news
GROUP BY 1
LIMIT 20;

#10
SELECT strftime('%H', timestamp), AVG(score), COUNT(*)
FROM hacker_news
GROUP BY 1
ORDER BY 2 DESC;

#11
SELECT strftime('%H', timestamp) AS 'Hour', ROUND(AVG(score),0) AS 'Average Score', COUNT(*) AS 'Number of Stories'
FROM hacker_news
WHERE 1 IS NOT NULL
GROUP BY 1
ORDER BY 2 DESC;
