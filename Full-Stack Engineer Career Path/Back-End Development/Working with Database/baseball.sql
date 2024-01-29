#1 Heaviest Hitters
/*This award goes to the team with the highest average weight of its batters on a given year.*/
SELECT ROUND(AVG(people.weight),2) AS "Average Weight", batting.yearid  AS "Year", teams.name
FROM people 
JOIN batting
ON people.playerid = batting.playerid
JOIN teams
ON batting.teamid = teams.teamid
GROUP BY batting.yearid, name
ORDER BY 1 DESC;

#2 Shortest Sluggers
/*This award goes to the team with the smallest average height of its batters on a given year. This query should
look very similar to the one you wrote to find the heaviest teams.*/
SELECT ROUND(AVG(people.height),2) AS "Average Weight", batting.yearid  AS "Year", teams.name
FROM people 
JOIN batting
ON people.playerid = batting.playerid
JOIN teams
ON batting.teamid = teams.teamid
GROUP BY batting.yearid, name
ORDER BY 1 ;

#3 Biggest Spenders
/*This award goes to the team with the largest total salary of all players in a given year.*/
SELECT SUM(salaries.salary) AS "Total Spent", teams.name AS "Name", salaries.yearid AS "Year"
FROM salaries
JOIN teams
ON salaries.teamid = teams.teamid
  AND salaries.yearid = teams.yearid
GROUP BY 2, 3
ORDER BY 1 DESC;

#4 Most Bang For Their Buck In 2010
/*This award goes to the team that had the smallest "cost per win" in 2010. Cost per win is determined by the
total salary of the team divided by the number of wins in a given year. Note that we decided to look at just
teams in 2010 because when we found this award looking across all years, we found that due to inflation, teams
from the 1900s spent much less money per win. We thought that looking at all teams in just the year 2010 gave
a more interesting statistic.*/
SELECT teams.name as "Name", salaries.yearid AS "Year", teams.w AS "Wins", ROUND(SUM(salaries.salary)/teams.w) AS "Cost per Win"
FROM salaries
JOIN teams
ON salaries.teamid = teams.teamid
	AND salaries.yearid = teams.yearid
WHERE salaries.yearid = 2010
GROUP BY 1, 2, 3
ORDER BY 4;

#5 Priciest Starter
/*This award goes to the pitcher who, in a given year, cost the most money per game in which they were the
starting pitcher. Note that many pitchers only started a single game, so to be eligible for this award, you had to
start at least 10 games*/
SELECT people.namegiven AS "Name", ROUND(salaries.salary/pitching.g) AS "Cost per game", salaries.yearid AS "Year", pitching.g AS "Games"
FROM salaries 
JOIN pitching
ON salaries.playerid = pitching.playerid
	AND salaries.yearid = pitching.yearid
  AND salaries.teamid = pitching.teamid
JOIN people
ON salaries.playerid = people.playerid 
WHERE pitching.gs >= 10
ORDER BY 2 DESC;
