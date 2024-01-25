CREATE TABLE friends (
  id INTEGER,
  name TEXT,
  birthday DATE
);

INSERT INTO friends(id, name, birthday)
VALUES (1, 'Ororo Munroe', '1940-05-30');


INSERT INTO friends(id, name, birthday)
VALUES (2, 'Johnny', '1998-01-01');


INSERT INTO friends(id, name, birthday)
VALUES (3, 'Henry', '1998-12-31');

UPDATE friends
SET name = "STORM"
WHERE id =1;

ALTER TABLE friends
ADD COLUMN email;

UPDATE friends
SET email = "storm@codecademy.com"
WHERE id = 1;

DELETE FROM friends
WHERE id =1;
SELECT * FROM friends;
