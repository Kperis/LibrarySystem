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


# cursor = mydb.cursor(buffered = True)


book_list = [{
        'title':'narnia',
        'category':'fantasy',
        'cover': 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a0c39048873339.58a470c427a06.jpg'
    },
    {
        'title': 'harry potter',
        'category': 'fantasy',
        'cover': 'https://images.squarespace-cdn.com/content/v1/5c71c7d8aadd342945360ba1/1586723509001-E5NQB7VLS1R9NS0EOSOM/Harry+Potter+and+the+Philosopher%27s+Stone+Original+Children%27s+Edition+Cover.jpg'     
    },
    {
        'title':'A Song of Ice And Fire',
        'category':'porn',
        'cover': 'https://upload.wikimedia.org/wikipedia/en/c/c2/Fire_%26_Blood_%282018%29_hardcover.jpg'

    },
    {
        'title':'The three body problem',
        'category':'Sci-fi',
        'cover' : 'https://m.media-amazon.com/images/I/919XM42JQlL.jpg'
    },
    {
        'title':'A Song of Ice And Fire',
        'category':'porn',
        'cover': 'https://upload.wikimedia.org/wikipedia/en/c/c2/Fire_%26_Blood_%282018%29_hardcover.jpg'
    },
    {
        'title':'A Song of Ice And Fire',
        'category':'porn',
        'cover': 'https://upload.wikimedia.org/wikipedia/en/c/c2/Fire_%26_Blood_%282018%29_hardcover.jpg'
    }
    ]

@app.route('/books',methods=['GET'])
def books():
    return(book_list)


@app.route('/register', methods=['POST'])
def register():
    print("register")
    data = request.get_json(['body'])
    username = data['username']
    password = data['password']

    first_name = data['first_name']
    last_name = data['last_name']
    age = data['birthday'].split('-')[0]
    type = data['role']
    # school_name = data['school_name']
    print(data)
    return({'success','success'})
    
    # cursor.execute('SELECT school_id FROM School WHERE School.name = "{}"'.format(school_name))
    # school_id = cursor.fetchall()[0][0]
    # cursor.execute('SELECT user_id FROM App_user WHERE App_user.school_id = {} AND type = "Admin"'.format(school_id))
    # admin_id = cursor.fetchall()[0][0]
    # cursor.execute('INSERT INTO App_user (school_id,first_name,last_name,age,type,admin_id,approved) \
    #                VALUES ({},"{}","{}",{},"{}",{},0)'.format(school_id,first_name,last_name,\
    #                 age,type,admin_id))
    # mydb.commit()
    # cursor.execute('SELECT user_id FROM App_user WHERE first_name = "{}" AND last_name = "{}"'.format(first_name,last_name))
    # user_id = cursor.fetchall()[0][0]
    # cursor.execute('INSERT INTO Authentication (user_id,username,password) VALUES ({},"{}","{}")'.format(user_id,username,password))
    # mydb.commit()
    # return {"data":"monument"}
#     #return('success')


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



@app.route('/signin',methods = ['POST','GET'])
def sign_in():
    data = request.get_json(['body'])
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
        return jsonify(result)
    except:
        print("no user found")
        return jsonify({"result": "failure"})
    # else:
    #     return 1

#@app.route('/books',methods = )


if __name__ == "__main__":
    app.run(debug = True, host="localhost", port = 3000)


