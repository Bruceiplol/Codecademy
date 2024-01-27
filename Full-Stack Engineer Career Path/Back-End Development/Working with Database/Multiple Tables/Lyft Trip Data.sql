#1
SELECT * FROM trips;
SELECT * FROM riders;
SELECT * FROM cars;

#2
SELECT *
FROM trips LEFT JOIN riders
ON trips.rider_id = riders.id;

#3
SELECT *
FROM trips JOIN cars 
ON trips.car_id = cars.id;

#4
SELECT *
FROM riders
UNION
SELECT *
FROM riders2;

#5
SELECT AVG(cost) FROM trips;

#6
SELECT * FROM riders
WHERE total_trips < 500
UNION SELECT * FROM riders2
WHERE total_trips < 500;

#7
SELECT * FROM cars
WHERE status = 'active';

#8
SELECT * FROM cars
ORDER BY trips_completed DESC
LIMIT 2;
