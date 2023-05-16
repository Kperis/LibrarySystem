CREATE VIEW Student_requests (first_name,last_name,date_of_request,book_title,card) AS
SELECT App_user.first_name , App_user.last_name, Request.date_of_request,Books.title,App_user.card
FROM App_user
JOIN Request
ON App_user.user_id = Request.user_id
JOIN Books
ON Request.isbn = Books.isbn;

CREATE VIEW Student_borrows (first_name,last_name,book_title,acquire_date,return_date,card) AS
SELECT App_user.first_name,App_user.last_name,Books.title,Borrow.acquire_date,Borrow.return_date,App_user.card
FROM App_user
JOIN Borrow
ON App_user.user_id = Borrow.user_id
JOIN Books
ON Books.isbn = Borrow.isbn;

CREATE VIEW School_students (first_name,last_name,approved,card,school_name) AS
SELECT App_user.first_name,App_user.last_name,App_user.approved,App_user.card,School.name
FROM App_user
JOIN School
ON App_user.school_id = School.school_id AND App_user.type = "Student";
