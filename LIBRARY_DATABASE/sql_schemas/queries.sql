--1.1 Main_Admin
SELECT School.name,School.school_id,COUNT(*) AS count_ev
FROM Borrow
INNER JOIN Books
ON Books.isbn = Borrow.isbn
INNER JOIN App_user
ON App_user.user_id = Borrow.user_id
INNER JOIN School
ON School.school_id = App_user.school_id
WHERE MONTH(Borrow.acquire_date) = 5
GROUP BY School.school_id;

--1.2 Main_Admin
SELECT Authors.first_name,Authors.last_name,Count(*)
FROM Authors
INNER JOIN Books
ON Books.isbn = Authors.isbn
INNER JOIN Categories
ON Books.isbn = Categories.isbn
WHERE Categories.category = "science fiction"
GROUP BY Authors.first_name,Authors.last_name;

SELECT CONCAT(App_user.first_name," ",App_user.last_name),Count(*)
FROM App_user
INNER JOIN Borrow
ON Borrow.user_id = App_user.user_id
INNER JOIN Books
ON Books.isbn = Borrow.isbn
INNER JOIN Categories
ON Categories.isbn = Books.isbn
WHERE Categories.category = "romance" AND App_user.type = "Καθηγητής"
GROUP BY App_user.first_name,App_user.last_name;

--1.3 Main_Admin
SELECT CONCAT(App_user.first_name," ",App_user.last_name),COUNT(*) AS count_borrows
FROM App_user
INNER JOIN Borrow
ON Borrow.user_id = App_user.user_id
INNER JOIN Books
ON Books.isbn = Borrow.isbn
WHERE App_user.age < 40 AND App_user.type = "Καθηγητής"
GROUP BY App_user.first_name,App_user.last_name
LIMIT 10;

--1.4 Main_Admin
SELECT first_name,last_name,isbn FROM (
SELECT Authors.first_name,Authors.last_name,Borrow.isbn
FROM Authors
INNER JOIN Books
ON Books.isbn = Authors.isbn
LEFT JOIN Borrow
ON Borrow.isbn = Books.isbn
WHERE Borrow.isbn IS NULL
) o
WHERE CONCAT(o.first_name," ",o.last_name) NOT IN (
SELECT CONCAT(Authors.first_name," ",Authors.last_name)
FROM Authors
INNER JOIN Books
ON Books.isbn = Authors.isbn
LEFT JOIN Borrow
ON Borrow.isbn = Books.isbn
WHERE Borrow.isbn IS NOT NULL)
GROUP BY first_name,last_name;

--1.5 Main_Admin
SELECT App_user.first_name,App_user.last_name,o.count_ev
FROM App_user
JOIN (SELECT App_user.admin_id,COUNT(*) AS count_ev,Borrow.acquire_date
      FROM App_user
      INNER JOIN School
      ON School.school_id = App_user.school_id
      INNER JOIN Borrow
      ON Borrow.user_id = App_user.user_id
      GROUP BY App_user.admin_id
      HAVING COUNT(*) > 0) o
ON App_user.user_id = o.admin_id
WHERE o.count_ev > 20 AND YEAR(o.acquire_date) = 2023
ORDER BY o.count_ev;
--1.5 version 2
SELECT * FROM(
        SELECT CONCAT(App_user.first_name," ",App_user.last_name),o.count_ev
        FROM App_user
        JOIN (SELECT App_user.admin_id,COUNT(*) AS count_ev,Borrow.acquire_date
              FROM App_user
              INNER JOIN School
              ON School.school_id = App_user.school_id
              INNER JOIN Borrow
              ON Borrow.user_id = App_user.user_id
              GROUP BY App_user.admin_id
              HAVING COUNT(*) > 0) o
        ON App_user.user_id = o.admin_id
        WHERE o.count_ev > 0 AND YEAR(o.acquire_date) = 2023
        ) t
        WHERE t.count_ev IN (
                SELECT l.count_ev
                FROM App_user
                JOIN (SELECT App_user.admin_id,COUNT(*) AS count_ev,Borrow.acquire_date
                      FROM App_user
                      INNER JOIN School
                      ON School.school_id = App_user.school_id
                      INNER JOIN Borrow
                      ON Borrow.user_id = App_user.user_id
                      GROUP BY App_user.admin_id
                      HAVING COUNT(*) > 0) l
                ON App_user.user_id = l.admin_id
                WHERE l.count_ev > 0 AND YEAR(l.acquire_date) = 2023
                GROUP BY l.count_ev
                HAVING COUNT(*) > 1)
ORDER BY t.count_ev

--1.7 Main_Admin
SELECT CONCAT(first_name," ",last_name)
FROM
        (SELECT Authors.first_name,Authors.last_name,COUNT(*) AS count_ev,
        (SELECT MAX(o.count_ev) 
                FROM (  SELECT Authors.first_name,Authors.last_name,COUNT(*) AS count_ev
                        FROM Authors
                        INNER JOIN Books
                        ON Books.isbn = Authors.isbn
                        GROUP BY Authors.first_name,Authors.last_name) o ) AS max_value
        FROM Authors
        INNER JOIN Books
        ON Books.isbn = Authors.isbn
        GROUP BY Authors.first_name,Authors.last_name
) o
WHERE o.count_ev <= o.max_value - 5;


--1.6 Main Admin
SELECT l.first_category,l.second_category,count_combination
FROM (
        SELECT o.user_id AS user_id_1,k.user_id AS user_id_2,CONCAT(o.category," ",k.category) AS category_comb,COUNT(*) as count_combination,o.category AS first_category,k.category AS second_category
        FROM (
                SELECT Borrow.isbn,Borrow.user_id,Categories.category,Borrow.borrow_id
                FROM Borrow
                INNER JOIN Books
                ON Books.isbn = Borrow.isbn
                INNER JOIN Categories
                ON Categories.isbn = Books.isbn) o
        INNER JOIN (
                SELECT Borrow.isbn,Borrow.user_id,Categories.category,Borrow.borrow_id
                FROM Borrow
                INNER JOIN Books
                ON Books.isbn = Borrow.isbn
                INNER JOIN Categories
                ON Categories.isbn = Books.isbn) k
        ON o.borrow_id = k.borrow_id
        WHERE o.category != k.category
        GROUP BY category_comb) l
ORDER BY count_combination DESC
LIMIT 6;