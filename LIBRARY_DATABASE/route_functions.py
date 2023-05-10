import routes
from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import jsonify



mydb = con.connect(
host = "localhost",
user = "root",
password = "ChoedanKal2002",
database = "schooldatabasev4"
)



cursor = mydb.cursor(buffered = True)



def print_aaa():
    print("hello from other file")

def fuser_username(username):
    cursor.execute('SELECT user_id FROM Authentication WHERE Authentication.username = "{}"'.format(username))
    result = cursor.fetchall()[0][0]
    return result
def fschool_name(school_name):
    cursor.execute('SELECT school_id FROM School WHERE School.name = "{}"'.format(school_name))
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
    cursor.execute('SELECT Books.title,Authentication.username,App_user.first_name,App_user.last_name\
                   ,return_date,acquire_date\
                    FROM Authentication\
                    JOIN App_user\
                    ON App_user.user_id = Authentication.user_id\
                    JOIN Borrow\
                    ON Borrow.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Borrow.isbn\
                    WHERE Authentication.username = "{}"'.format(username))
    result = cursor.fetchall()
    return result
def fborrow_school(username):
    cursor.execute('SELECT user_id\
                    FROM App_user\
                    JOIN Authentication\
                    ON App_user.user_id = Authentication.user_id\
                    WHERE Authentication.username = "{}"'.format(username))
    admin_id = cursor.fetchall()[0][0]
    cursor.execute('SELECT Books.title,Authentication.username,App_user.first_name,App_user.last_name\
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
    cursor.execute('SELECT Books.isbn,Books.title,Authentication.username,App_user.first_name,App_user.last_name,\
                   Request.date_of_request\
                    FROM Authentication\
                    JOIN App_user\
                    ON Authentication.user_id = App_user.user_id\
                    JOIN Request\
                    ON Request.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Request.isbn\
                    WHERE Authentication.username = "{}"'.format(username))
   
    result = cursor.fetchall()
    print(result)
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
    cursor.fetchall()
    cursor.execute('SELECT Stores.copies,Stores.school_id\
                    FROM Stores\
                    JOIN School\
                    ON School.school_id = Stores.school_id\
                    JOIN App_user\
                    ON App_user.school_id = School.school_id\
                    WHERE App_user.user_id = {} AND Stores.isbn = {}'.format(user_id,isbn))
    data = cursor.fetchall()
    cursor.execute('UPDATE Stores\
                    SET Stores.copies = {}\
                    WHERE Stores.isbn = {} AND Stores.school_id = {}'.format(data[0][0],isbn,data[0][1]))
    mydb.commit()

