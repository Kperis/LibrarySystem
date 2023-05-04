from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import jsonify
import route_functions

import json

app = Flask(__name__)
CORS(app)

mydb = con.connect(
host = "localhost",
user = "root",
password = "",
database = "schooldatabasev4"
)


cursor = mydb.cursor(buffered = True)




# @app.route('/books',methods=['GET'])
# def books():
#     return(book_list)



@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'GET':
        cursor.execute('SELECT name FROM School')
        to_send = cursor.fetchall()

        return jsonify(to_send)
    elif request.method == 'POST':
        data = request.get_json(['body'])
        school_id = route_functions.fschool_name(data['school_name'])
        admin_id = route_functions.fadmin_schoolid(school_id)
        route_functions.insert_user(school_id,data['first_name'],data['last_name'],data['birthday'].split('-')[0],data['type'],admin_id)
        user_id = route_functions.fuser_flname(data['first_name'],data['last_name'])
        route_functions.insert_authentication(user_id,data['username'],data['password'])

        return {"data":"monument"}
    else:
        print("ERROR")
        return 1


# @app.route('/signin',methods = ['GET','POST'])
# def sign_in():
#     data = request.get_json(['body'])
#     username = data['username']
#     password = data['password']
#     cursor.execute('SELECT user_id FROM Authentication WHERE username = "{}" AND password = "{}"'.format(username, password))
#     try:
#         cursor.fetchall()[0][0]
#         print("success")
#         return jsonify({"result":"success"})
#     except:
#         print("no user found")
#         return jsonify({"result":"failure"})

@app.route('/signin',methods = ['POST'])
def sign_in():
    if request.method == 'POST':
        data = request.get_json(['body'])
        username = data['username']
        password = data['password']
        cursor.execute('SELECT user_id FROM Authentication WHERE username = "{}" AND password = "{}"'.format(username, password))
        try:
            cursor.fetchall()[0][0]
            print("success")
            return jsonify({"result": "success"})
        except:
            print("no user found")
            return jsonify({"result": "failure"})
    else:
        return 1


# @app.route('/', methods=['GET'])
# def hello():
#     return 'Hello'
# @app.route('/',methods= ['GET','POST'])
# def start_page():
#     return render_template('index.html')

# @app.route('/sign_up',methods = ['GET','POST'])
# def sign_up():
#     cursor = mydb.cursor(buffered=True)
#     cursor.execute("SELECT name FROM School")
#     school_names = cursor.fetchall()
#     cursor.close()

#     return render_template('sign_up.html',data = school_names)

if __name__ == "__main__":
    app.run(debug = True, host="localhost", port = 3000)


