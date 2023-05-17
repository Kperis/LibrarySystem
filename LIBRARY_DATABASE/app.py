# from flask import Flask,make_response,render_template
# from flask import request
import flask
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS,cross_origin
# from flask import jsonify
import route_functions

import json
from datetime import date
from datetime import datetime

app = flask.Flask(__name__)
cors = CORS(app,resources={
    r"/*":{
        "origins":"*"
    }
})

mydb = con.connect(
host = "localhost",
user = "root",
password = "",#"ChoedanKal2002",
database = "schooldatabasev4",
)

cursor = mydb.cursor(buffered = True)
def delete_outdated_requests():
    today = date.today()
    today.strftime("%Y/%m/%d")

    cursor.execute('SELECT Request.request_id,Request.date_of_request FROM Request')
    data = cursor.fetchall()
    for i in range(len(data)):
        acquire_date = data[i][1]
        acquire_date.strftime("%Y/%m/%d")
        difference = today - acquire_date

        if difference.days > 7:
            cursor.execute('DELETE FROM Request WHERE Request.request_id = {}'.format(data[i][0]))
            mydb.commit()




@app.route('/register', methods=['GET','POST'])
@cross_origin(headers=['Content-Type']) 
def register():
    if flask.request.method == 'GET':
        # cursor.execute('SELECT name FROM School')
        # to_send = cursor.fetchall()

        # return flask.jsonify(to_send)
        cursor.execute('SELECT name,city FROM School')
        to_send = cursor.fetchall()
        data = [dict(zip(("name","city"), x))for x in to_send]
        return flask.jsonify(data)
    elif flask.request.method == 'POST':
        data = flask.request.get_json(['body'])
        if data['role'] == 'student':
            role = 'Μαθητής'
        elif data['role'] == 'admin':
            role = 'Admin'
        else:
            role = 'Καθηγητής'
        #school_id = route_functions.fschool_name(data['school_name'])
        school_id = route_functions.fschool_name_city(data['school_name'],data['city'])
        admin_id = route_functions.fadmin_schoolid(school_id)
        route_functions.insert_user(school_id,data['first_name'],data['last_name'],data['birthday'].split('-')[0],role,admin_id)
        user_id = route_functions.fuser_flname(data['first_name'],data['last_name'])
        route_functions.insert_authentication(user_id,data['username'],data['password'])

        return {"data":"monument"}
    else:
        print("ERROR")
        return 1



@app.route('/signin',methods = ['POST'])
@cross_origin(headers=['Content-Type']) 
def sign_in():
    
    data = flask.request.get_json(['body'])
    username = data['username']
    password = data['password']
    cursor.execute('SELECT user_id FROM Authentication WHERE username = "{}" AND password = "{}"'.format(username, password))
    user_id = cursor.fetchall()[0][0]
    try:
        cursor.execute('SELECT Authentication.username,Authentication.password,School.city,School.name\
                       ,App_user.first_name,App_user.last_name,App_user.type,App_user.age,App_user.approved \
                        FROM Authentication JOIN App_user \
                        ON App_user.user_id = Authentication.user_id JOIN School \
                        ON School.school_id = App_user.school_id \
                        WHERE Authentication.user_id = {} AND App_user.approved=1'.format(user_id))
        result = cursor.fetchall()
        return flask.jsonify({"username":result[0][0],"password":result[0][1],"city":result[0][2],"school_name":result[0][3],"first_name":result[0][4],"last_name":result[0][5],"role":result[0][6],"age":result[0][7],"user_id":user_id,"approved":result[0][8]})
    except:
        cursor.execute('SELECT Authentication.username\
                       ,App_user.first_name,App_user.last_name,App_user.type,App_user.age,App_user.approved \
                       FROM Authentication JOIN App_user ON App_user.user_id=Authentication.user_id WHERE Authentication.user_id={}'.format(user_id))
        result = cursor.fetchall()
        if result:
            return flask.jsonify({'username':result[0][0],'first_name':result[0][1],'last_name':result[0][2],'role':result[0][3],'age':result[0][4],'approved':result[0][5],'user_id':user_id})
        else:
            return flask.jsonify({"result": "failure","data":0})
    return flask.jsonify({"result": "failure","data":0})
    # else:
    #     return 1

@app.route('/books',methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def books():
    data = flask.request.get_json(['body'])
    school_name = data['school_name']
    school_city = data['city']
    cursor.execute('SELECT Books.isbn,Books.page_count,Books.publisher,Books.title,Books.summary,Books.cover_path,Books.m_cover_path,Stores.copies\
                FROM Books\
                JOIN Stores\
                ON Stores.isbn = Books.isbn\
                JOIN School\
                ON School.school_id = Stores.school_id\
                WHERE School.name = "{}" AND School.city = "{}"'.format(school_name,school_city))
    book_data = cursor.fetchall()
    if book_data:
        book_dict = [dict(zip(("isbn","page_count","publisher","title","summary","cover","cover_m","copies"), x))for x in book_data]
        for i in range(len(book_dict)):
            cursor.execute('SELECT CONCAT(Authors.first_name," ",Authors.last_name) FROM Authors WHERE Authors.isbn = {}'.format(book_dict[i]['isbn']))
            authors = cursor.fetchall()
            book_dict[i]['authors'] = authors
        for i in range(len(book_dict)):
            cursor.execute('SELECT Keywords.keyword FROM Keywords WHERE isbn = {}'.format(book_dict[i]['isbn']))
            keywords = cursor.fetchall()
            book_dict[i]['keywords'] = keywords

    #cursor.execute('SELECT Keywords.keyword FROM Keywords JOIN 
        return flask.jsonify(book_dict)
    else:
        return flask.jsonify({'books':'none'})
    # "result":"success","isbn":book_data[0][0],"page_count":book_data[0][1],"publisher":book_data[0][2],"title":book_data[0][3],"summary":book_data[0][4],"cover":book_data[0][5]


@app.route('/borrow',methods = ['POST','PUT'])
@cross_origin(headers=['Content-Type'])
def borrow():
    if flask.request.method == 'POST':
        data = flask.request.get_json(['body'])
        username = data['username']
        type = data['role']
        if type == 'student' or type == 'teacher':
            result = route_functions.fborrow_username(username)
            if result:
                borrow_dict = [dict(zip(('isbn','title','cover_m','username','first_name','last_name','return_date','acquire_date'),x)) for x in result]
                for i in range(len(borrow_dict)):
                    cursor.execute('SELECT CONCAT(Authors.first_name," ",Authors.last_name) FROM Authors WHERE Authors.isbn = {}'.format(borrow_dict[i]['isbn']))
                    authors = cursor.fetchall()
                    borrow_dict[i]['authors'] = authors
                for i in range(len(borrow_dict)):
                    cursor.execute('SELECT Keywords.keyword FROM Keywords WHERE isbn = {}'.format(borrow_dict[i]['isbn']))
                    keywords = cursor.fetchall()
                    borrow_dict[i]['keywords'] = keywords
                return flask.jsonify(borrow_dict)
            else:
                return flask.jsonify({'borrows':'none'})
            # except:
            #     print("fail")
            #     return flask.jsonify({"result":"no_borrows"})
        elif (type == "Admin"):
            try:
                result = route_functions.fborrow_school(username)
                if result:
                    borrow_dict = [dict(zip(('isbn','title','username','first_name','last_name','role','return_date','acquire_date'),x)) for x in result]
                    return flask.jsonify(borrow_dict)
                else:
                    return flask.jsonify({'borrows':'none'})
            except:
                return flask.jsonify({"result": "fail"})
    elif flask.request.method == 'PUT':
        data = flask.request.get_json(['body'])
        username = data['username']
        isbn = data['isbn']
        user_id = route_functions.fuser_username(username)
        route_functions.delete_borrow(user_id,isbn)
        #ΥΠΑΡΧΕΙ ΕΝΑ ERROR επειδή για καποιο λόγω βιβλία με διαφορετικό isbn μπορεί να έχουν το ιδιο
        #τίτλο και η sql δεν ξεχωρίζει τα κεφαλαία γράμματα απο τα μικρά
        return flask.jsonify({"delete":"success"})
    
@app.route('/request',methods = ['POST','PUT'])
@cross_origin(headers=['Content-Type']) #Δεν την έχω δοκιμάσει ακόμα
def request():
    if flask.request.method == 'POST':
        data = flask.request.get_json(['body'])
        username = data['username']
        type = data['role']
        if type == 'student' or type == 'teacher':
            # Στέλνω isbn,title,username,first_name,last_name,date_of_request
            result = route_functions.frequest_username(username)
            if result:
                request_dict = [dict(zip(('isbn','title','cover_m','username','first_name','last_name','date_of_request'),x)) for x in result]
                for i in range(len(request_dict)):
                    cursor.execute('SELECT CONCAT(Authors.first_name," ",Authors.last_name) FROM Authors WHERE Authors.isbn = {}'.format(request_dict[i]['isbn']))
                    authors = cursor.fetchall()
                    request_dict[i]['authors'] = authors
                for i in range(len(request_dict)):
                    cursor.execute('SELECT Keywords.keyword FROM Keywords WHERE isbn = {}'.format(request_dict[i]['isbn']))
                    keywords = cursor.fetchall()
                    request_dict[i]['keywords'] = keywords
                return flask.jsonify(request_dict)
            else:
                return flask.jsonify({'requests':'none'})
        elif type == "Admin":
            # Στέλνω isbn,title,username,first_name,last_name,date_of_request
            result = route_functions.frequest_school(username)
            if result:
                request_dict = [dict(zip(('copies','isbn','title','username','first_name','last_name','role','date_of_request'),x)) for x in result]
                return flask.jsonify(request_dict)
            else:
                return flask.jsonify({'requests':'none'})
    elif flask.request.method == 'PUT':
        data = flask.request.get_json(['body'])
        username = data['username']
        isbn = data['isbn']
        type = data['role']
        user_id = route_functions.fuser_username(username)
        if type == 'Admin':
            route_functions.delete_request(user_id,isbn)
            return flask.jsonify({"delete":"successful"})
        else:
            route_functions.delete_user_request(user_id,isbn)
            return flask.jsonify({'delete':'success'})


@app.route('/book_request',methods = ['POST'])
@cross_origin(headers=['Content-Type']) 
def request_book():
    data = flask.request.get_json(['body'])
    username = data['username']
    isbn = data['isbn']
    user_id = route_functions.fuser_username(username)
    cursor.execute('INSERT INTO Request(date_of_request, isbn, user_id) VALUES(CURDATE(), {},{})'.format(isbn,user_id))
    mydb.commit()
    return flask.jsonify({'success':'success'})

@app.route('/reviews',methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def get_reviews():
    data = flask.request.get_json(['body'])
    type = data['role']
    if type == "student":
        isbn = data['isbn']
        username = data['username']
        result = route_functions.freview_isbn_approved(isbn)
        if result:
            reviews_dict = [dict(zip(('review_date','score','description','first_name','last_name','approved'),x))for x in result]
            return flask.jsonify(reviews_dict)
        else:
            return flask.jsonify({'reviews':'none'})
    elif type == "Admin":
        username = data['username']
        school_id = route_functions.fschool_username(username)
        result = route_functions.freview_school(school_id)
        reviews_dict = [dict(zip(('review_date','score','description','username','first_name','last_name','approved','title','isbn'),x))for x in result]
        return flask.jsonify(reviews_dict)


@app.route('/user_review',methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def hasReviewed():
    data = flask.request.get_json(['body'])
    isbn = data['isbn']
    username = data['username']
    user_id = route_functions.fuser_username(username)
    cursor.execute('SELECT * FROM Review WHERE isbn={} AND user_id={}'.format(isbn,user_id))
    result = cursor.fetchall()
    if result:
        return flask.jsonify({'reviewed':'yes'})
    else:
        return flask.jsonify({'reviewed': 'none'})

@app.route('/submit_review',methods = ['POST'])
@cross_origin(headers=['Content-Type'])
def submit_review():
    data = flask.request.get_json(['body'])
    isbn = data['isbn']
    username = data['username']
    score = data['score']
    description = data['description']
    score = int(score)
    user_id = route_functions.fuser_username(username)
    cursor.execute('INSERT INTO Review(date_of_review,score,description,isbn,user_id,approved) VALUES(CURDATE(),{}, "{}",{},{},{})'.format(score,description,isbn,user_id,0))
    mydb.commit()
    return flask.jsonify({'success':'success'})

@app.route('/accept_review',methods = ['POST'])
@cross_origin(headers = ['Content-Type'])
def accept_review():
    data = flask.request.get_json(['body'])
    isbn = data['isbn']
    username = data['username']
    approved = data['approved']
    if approved == 1:
        route_functions.approve_review(isbn,username)
    elif approved == 0:
        route_functions.delete_review(isbn,username)
    return flask.jsonify({"success":"success"})


@app.route('/change_password',methods = ['PUT'])
@cross_origin(headers=['Content-Type'])
def changePassword():
    data = flask.request.get_json(['body'])
    username = data['username']
    password = data['new_password']
    cursor.execute('UPDATE Authentication SET password="{}" WHERE username="{}"'.format(password,username))
    mydb.commit()
    return flask.jsonify({'success':'success'})

@app.route('/change_school',methods = ['PUT'])
@cross_origin(headers = ['Content-Type'])
def changeSchool():
    data = flask.request.get_json(['body'])
    username = data['username']
    school_name = data['new_school_name']
    old_city = data['old_city']
    city = data['new_city']
    type = data['role']

    if type == 'Καθηγητής':
        user_id = route_functions.fuser_username(username)
        school_id = route_functions.fschool_name_city(school_name,old_city)
        cursor.execute('UPDATE App_user SET App_user.school_id = {} WHERE App_user.user_id = {}'.format(school_id,user_id))
        mydb.commit()
        return flask.jsonify({"success":'success'}) 
    else:
        return flask.jsonidy({"success":'failure'})

@app.route('/mean_score',methods = ['POST'])
@cross_origin(headers = ['Content-Type'])
def mean_scores():
    data = flask.request.get_json(['body'])
    username = data['username']

    school_id = route_functions.fschool_username(username)
    result = route_functions.fmean_score_user(school_id)
    return flask.jsonify(result)

@app.route('/user_approve',methods = ['POST','PUT'])
def approve_user():
    if flask.request.method == 'POST':
        data = flask.request.get_json(['body'])
        username = data['username']
        type = data['role']
        if type == 'Admin':
            user_id = route_functions.fuser_username(username)
            cursor.execute('SELECT App_user.first_name,App_user.last_name,App_user.age,App_user.type,Authentication.username FROM Authentication JOIN App_user ON App_user.user_id=Authentication.user_id WHERE App_user.admin_id={} AND App_user.approved=0'.format(user_id))
            result = cursor.fetchall()
            if result:
                users_dict = [dict(zip(('first_name','last_name','age','role','username'),x)) for x in result]
                return flask.jsonify(users_dict)
            else:
                return flask.jsonify({'new_users':'none'})
        else:
            user_id = route_functions.fuser_username(username)
            cursor.execute('SELECT App_user.first_name,App_user.last_name,App_user.age,App_user.type,Authentication.username,School.name,School.city \
                            FROM Authentication JOIN App_user ON App_user.user_id=Authentication.user_id \
                            JOIN School ON App_user.school_id=School.school_id WHERE App_user.type="Admin" AND App_user.approved=0')
            result = cursor.fetchall()
            if result:
                users_dict = [dict(zip(('first_name','last_name','age','role','username','school_name','school_city'),x)) for x in result]
                return flask.jsonify(users_dict)
            else:
                return flask.jsonify({'new_users':'none'})
    elif flask.request.method == 'PUT':
        data = flask.request.get_json(['body'])
        username = data['username']
        user_id = route_functions.fuser_username(username)
        approve = data['approve']
        if approve == 1:
            cursor.execute('UPDATE App_user SET approved=1 WHERE user_id={}'.format(user_id))
            mydb.commit()
            return flask.jsonify({"user":"activated"})
        else:
            cursor.execute('DELETE FROM App_user WHERE user_id={}'.format(user_id))
            mydb.commit()
            return flask.jsonify({"user":"deleted"})



@app.route('/main_admin/all_borrows',methods = ['POST'])
@cross_origin(headers = ['Content-Type'])
def borrows_of_schools():
    data = flask.request.get_json(['body'])
    month = data['month']
    result = route_functions.fallborrows_schools(month)
    return flask.jsonify(result)

@app.route('/main_admin/category_search',methods = ['POST'])
@cross_origin(headers = ['Content-Type'])
def main_admin_category():
    data = flask.request.get_json(['body'])
    
    category = data['category']

    authors = route_functions.fauthors_categories(category)
    teachers = route_functions.fteachers_category(category)
    result = {}
    result['authors'] = authors
    result['teachers'] = teachers
    return flask.jsonify(result)

@app.route('/main_admin/no_borrow_author',methods = ['GET'])
@cross_origin(headers = ['Content-Type'])
def no_borrows_author():

    result = route_functions.fno_borrows_authors()
    return flask.jsonify(result)

@app.route('/main_admin/5_less_top',methods = ['GET'])
@cross_origin(headers = ['Content-Type'])
def five_less_top():
    result = route_functions.ffive_less_topauthor()
    return flask.jsonify(result)

if __name__ == "__main__":
    app.debug = True
    delete_outdated_requests()
    app.run(threaded=True,debug = True, host="localhost", port = 5000)

