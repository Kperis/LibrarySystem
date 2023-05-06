# from flask import Flask,make_response,render_template
# from flask import request
import flask
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS
# from flask import jsonify
import route_functions

import json
# from datetime import date

app = flask.Flask(__name__)
CORS(app)

mydb = con.connect(
host = "localhost",
user = "root",
password = "",
database = "schooldatabasev4"
)


cursor = mydb.cursor(buffered = True)



@app.route('/register', methods=['GET','POST'])
def register():
    if flask.request.method == 'GET':
        cursor.execute('SELECT name FROM School')
        to_send = cursor.fetchall()

        return flask.jsonify(to_send)
    elif flask.request.method == 'POST':
        data = flask.request.get_json(['body'])
        school_id = route_functions.fschool_name(data['school_name'])
        admin_id = route_functions.fadmin_schoolid(school_id)
        route_functions.insert_user(school_id,data['first_name'],data['last_name'],data['birthday'].split('-')[0],data['role'],admin_id)
        user_id = route_functions.fuser_flname(data['first_name'],data['last_name'])
        route_functions.insert_authentication(user_id,data['username'],data['password'])

        return {"data":"monument"}
    else:
        print("ERROR")
        return 1



@app.route('/signin',methods = ['POST','GET'])
def sign_in():
    data = flask.request.get_json(['body'])
    username = data['username']
    password = data['password']
    cursor.execute('SELECT user_id FROM Authentication WHERE username = "{}" AND password = "{}"'.format(username, password))
    try:
        user_id = cursor.fetchall()[0][0]
        print("success")
        print(user_id)
        cursor.execute('SELECT Authentication.username,Authentication.password,School.name\
                        FROM Authentication JOIN App_user\
                        ON App_user.user_id = Authentication.user_id JOIN School\
                        ON School.school_id = App_user.school_id\
                        WHERE Authentication.user_id = {}'.format(user_id))
        result = cursor.fetchall()
        print(result)
        return flask.jsonify({"result":"success","username":result[0][0],"password":result[0][1],"School":result[0][2]})
    except:
        print("no user found")
        return flask.jsonify({"result": "failure","data":0})
    # else:
    #     return 1

@app.route('/books',methods = ['POST'])
def books():
    data = flask.request.get_json(['body'])
    school_name = data['school_name']
    cursor.execute('SELECT Books.isbn,Books.page_count,Books.publisher,Books.title,Books.summary,Books.cover_path,Books.m_cover_path\
                FROM Books\
                JOIN Stores\
                ON Stores.isbn = Books.isbn\
                JOIN School\
                ON School.school_id = Stores.school_id\
                WHERE School.name = "{}";'.format(school_name))
    book_data = cursor.fetchall()
    return flask.jsonify(book_data)


@app.route('/borrow',methods = ['POST','PUT','GET'])
def borrow():
    if flask.request.method == 'POST':
        data = flask.request.get_json(['body'])
        username = data['username']
        type = data['role']
        if(type == "Student"):
            result = route_functions.fborrow_username(username)
            return flask.jsonify(result)
        elif (type == "Admin"):
            result = route_functions.fborrow_school(username)
            return flask.jsonify(result)
    elif flask.request.method == 'PUT':
        data = flask.request.get_json(['body'])
        username = data['username']
        title = data['title']
        isbn = route_functions.fbook_title(title)
        user_id = route_functions.fuser_username(username)
        print(user_id)
        print(isbn)
        route_functions.delete_borrow(user_id,isbn)
        #ΥΠΑΡΧΕΙ ΕΝΑ ERROR επειδή για καποιο λόγω βιβλία με διαφορετικό isbn μπορεί να έχουν το ιδιο
        #τίτλο και η sql δεν ξεχωρίζει τα κεφαλαία γράμματα απο τα μικρά
        return flask.jsonify({"delete":"success"})
    
@app.route('/request',methods = ['POST','PUT'])
def request():
    if flask.request.method == 'POST':
        data = request.get_json(['body'])
        username = data['username']
        type = data['role']
        if type == "Student":
            result = route_functions.frequest_username(username)
            return flask.jsonify(result)
        elif type == "Admin":
            pass


if __name__ == "__main__":
    app.run(debug = True, host="localhost", port = 5000)


