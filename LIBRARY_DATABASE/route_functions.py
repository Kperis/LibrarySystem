import app
from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import jsonify
import datetime



mydb = con.connect(
host = "localhost",
user = "root",
password = "",#"ChoedanKal2002",
database = "schooldatabasev4"
)



cursor = mydb.cursor(buffered = True)



def print_aaa():
    print("hello from other file")

def fuser_username(username):
    cursor.execute('SELECT user_id FROM Authentication WHERE Authentication.username = "{}"'.format(username))
    result = cursor.fetchall()[0][0]
    return result
def fschool_name_city(school_name,city):
    cursor.execute('SELECT school_id FROM School WHERE School.name = "{}" AND School.city = "{}"'.format(school_name,city))
    school_id = cursor.fetchall()[0][0]
    return school_id
def fadmin_schoolid(school_id):
    cursor.execute('SELECT user_id FROM App_user WHERE App_user.school_id = {} AND type = "Admin"'.format(school_id))
    admin_id = cursor.fetchall()[0][0]
    return admin_id
def fuser_flname(first_name,last_name):
    cursor.execute('SELECT user_id FROM App_user WHERE first_name = "{}" AND last_name = "{}"'.format(first_name,last_name))
    user_id = cursor.fetchall()[0][0]
    return user_id
def fborrow_username(username):
    # user_id = fuser_username(username)
    # cursor.execute('SELECT ')

    cursor.execute('SELECT Books.isbn,Books.title,Books.m_cover_path,Authentication.username,App_user.first_name,App_user.last_name,\
                    DATE_FORMAT(Borrow.return_date,"%m/%d/%Y"),DATE_FORMAT(Borrow.acquire_date,"%m/%d/%Y")\
                    FROM Authentication\
                    JOIN App_user\
                    ON App_user.user_id = Authentication.user_id\
                    JOIN Borrow\
                    ON Borrow.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Borrow.isbn\
                    WHERE Authentication.username = "{}"'.format(username))
    result = cursor.fetchall()
    mydb.commit()
    # cursor.execute('SELECT Books.isbn,Books.title,Authentication.username,App_user.first_name,App_user.last_name,\
    #                 Request.date_of_request\
    #                 FROM Authentication\
    #                 JOIN App_user\
    #                 ON Authentication.user_id = App_user.user_id\
    #                 JOIN Request\
    #                 ON Request.user_id = App_user.user_id\
    #                 JOIN Books\
    #                 ON Books.isbn = Request.isbn\
    #                 WHERE Authentication.username = "{}"'.format(username))
    return result

def fborrow_school(username):
    cursor.execute('SELECT user_id\
                    FROM App_user\
                    JOIN Authentication\
                    ON App_user.user_id = Authentication.user_id\
                    WHERE Authentication.username = "{}"'.format(username))
    admin_id = cursor.fetchall()[0][0]
    cursor.execute('SELECT Books.isbn,Books.title,Authentication.username,App_user.first_name,App_user.last_name\
                   ,return_date,acquire_date\
                    FROM Authentication\
                    JOIN App_user\
                    ON Authentication.user_id = App_user.user_id\
                    JOIN Borrow\
                    ON Borrow.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Borrow.isbn\
                    WHERE App_user.admin_id = {}'.format(admin_id))
    result = cursor.fetchall()
    
    return result
def fbook_title(title):
    cursor.execute('SELECT Books.isbn FROM Books WHERE Books.title = "{}"'.format(title))

    result = cursor.fetchall()[0][0]
    return result
def frequest_username(username):
    print('hi')
    cursor.execute('SELECT Books.isbn,Books.title,Books.m_cover_path,Authentication.username,App_user.first_name,App_user.last_name,\
                    DATE_FORMAT(Request.date_of_request, "%m/%d/%Y")\
                    FROM Authentication\
                    JOIN App_user\
                    ON Authentication.user_id = App_user.user_id\
                    JOIN Request\
                    ON Request.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Request.isbn\
                    WHERE Authentication.username = "{}"'.format(username))
   
    result = cursor.fetchall()
    mydb.commit()
    return result
    
def frequest_school(username):
    cursor.execute('SELECT Authentication.user_id FROM Authentication WHERE Authentication.username = "{}"'.format(username))
    admin_id = cursor.fetchall()[0][0]
    cursor.execute('SELECT Books.isbn,Books.title,Authentication.usename,App_user.first_name,App_user.last_name,\
                   Request.date_of_request\
                    FROM Authentication\
                    JOIN App_user\
                    ON Authentication.user_id = App_user.user_id\
                    JOIN Request\
                    ON Request.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Request.isbn\
                    WHERE App_user.admin_id = {}'.format(admin_id))
    result = cursor.fetchall()
    mydb.commit()
    return result
def freview_isbn_approved(isbn):
    cursor.execute('SELECT DATE_FORMAT(Review.date_of_review,"%m/%d/%Y"),Review.score,Review.description,App_user.first_name,App_user.last_name,Review.approved \
            FROM Review JOIN App_user ON Review.user_id = App_user.user_id \
            WHERE Review.isbn={} AND Review.approved = 1'.format(isbn))
    result = cursor.fetchall()
    mydb.commit()
    return result
def fschool_username(username):
    cursor.execute('SELECT School.school_id \
                   FROM School \
                   JOIN App_user \
                   ON App_user.school_id = School.school_id \
                   JOIN Authentication \
                   ON Authentication.user_id = App_user.user_id \
                   WHERE Authentication.username = "{}"'.format(username))
    result = cursor.fetchall()[0][0]
    return result
def freview_school(school_id):
    cursor.execute('SELECT DATE_FORMAT(Review.date_of_review,"%m/%d/%Y"),Review.score,Review.description,\
                   App_user.first_name,App_user.last_name,Review.approved \
                   FROM Review \
                   JOIN App_user \
                   ON App_user.user_id = Review.user_id \
                   WHERE App_user.school_id = {} AND Review.approved = 0'.format(school_id))
    result = cursor.fetchall()
    mydb.commit()
    return result

def insert_user(school_id,first_name,last_name,age,type,admin_id):
    cursor.execute('INSERT INTO App_user (school_id,first_name,last_name,age,type,admin_id,approved) \
                VALUES ({},"{}","{}",{},"{}",{},0)'.format(school_id,first_name,last_name,age,type,admin_id))
    mydb.commit()
    
def insert_authentication(user_id,username,password):
    cursor.execute('INSERT INTO Authentication (user_id,username,password) VALUES ({},"{}","{}")'.format(user_id,username,password))
    mydb.commit()

def delete_borrow(user_id,isbn):
    cursor.execute('DELETE FROM Borrow WHERE user_id = {} AND isbn = {}'.format(user_id,isbn))
    mydb.commit()
def delete_request(user_id,isbn):
    cursor.execute('DELETE FROM Request WHERE user_id = {} AND isbn = {}'.format(user_id,isbn))
    mydb.commit()
    print('done')
    return
    # cursor.fetchall()
    # cursor.execute('SELECT Stores.copies,Stores.school_id\
    #                 FROM Stores\
    #                 JOIN School\
    #                 ON School.school_id = Stores.school_id\
    #                 JOIN App_user\
    #                 ON App_user.school_id = School.school_id\
    #                 WHERE App_user.user_id = {} AND Stores.isbn = {}'.format(user_id,isbn))
    # data = cursor.fetchall()
    # cursor.execute('UPDATE Stores\
    #                 SET Stores.copies = {}\
    #                 WHERE Stores.isbn = {} AND Stores.school_id = {}'.format(data[0][0],isbn,data[0][1]))
    # mydb.commit()
def delete_review(isbn,username):
    cursor.execute('DELETE FROM Review WHERE Review.isbn = {} AND Review.username = "{}"'.format(isbn,username))
    mydb.commit()
    
def approve_review(isbn,username):
    cursor.execute('UPDATE Review \
                   SET Review.approved = 1 \
                   WHERE Review.isbn = {} AND Review.username = "{}"'.format(isbn,username))
    mydb.commit()

