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
password = "",
database = "schooldatabasev4"
)


cursor = mydb.cursor(buffered = True)



def print_aaa():
    print("hello from other file")

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

def insert_user(school_id,first_name,last_name,age,type,admin_id):
    cursor.execute('INSERT INTO App_user (school_id,first_name,last_name,age,type,admin_id,approved) \
                VALUES ({},"{}","{}",{},"{}",{},0)'.format(school_id,first_name,last_name,age,type,admin_id))
    mydb.commit()
    
def insert_authentication(user_id,username,password):
    cursor.execute('INSERT INTO Authentication (user_id,username,password) VALUES ({},"{}","{}")'.format(user_id,username,password))
    mydb.commit()