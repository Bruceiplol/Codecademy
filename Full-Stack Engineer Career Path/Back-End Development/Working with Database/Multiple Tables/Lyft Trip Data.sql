#1
/*examine the three tables.*/
SELECT * FROM trips;
SELECT * FROM riders;
SELECT * FROM cars;

#2
/*create a Trip Log with the trips and its users*/
SELECT *
FROM trips LEFT JOIN riders
ON trips.rider_id = riders.id;

#3
/*create a link between the trips and the cars used during those trips*/
SELECT *
FROM trips JOIN cars 
ON trips.car_id = cars.id;

#4
/*Stack the riders table on top of the new table named riders2*/
SELECT *
FROM riders
UNION
SELECT *
FROM riders2;

#5
SELECT AVG(cost) FROM trips;

#6
/*Find all the riders who have used Lyft less than 500 times*/
SELECT * FROM riders
WHERE total_trips < 500
UNION SELECT * FROM riders2
WHERE total_trips < 500;

#7
/*Calculate the number of cars that are active*/
SELECT COUNT(*) FROM cars
WHERE status = 'active';

#8
/*Finds the two cars that have the highest trips_completed*/
SELECT * FROM cars
ORDER BY trips_completed DESC
LIMIT 2;
