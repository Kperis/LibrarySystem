from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import jsonify


app = Flask(__name__)
CORS(app)

mydb = con.connect(
host = "localhost",
user = "root",
password = "",
database = "schooldatabasev4"
)


cursor = mydb.cursor(buffered = True)


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
    type = data['type']
    school_name = data['school_name']
    
    cursor.execute('SELECT school_id FROM School WHERE School.name = "{}"'.format(school_name))
    school_id = cursor.fetchall()[0][0]
    cursor.execute('SELECT user_id FROM App_user WHERE App_user.school_id = {} AND type = "Admin"'.format(school_id))
    admin_id = cursor.fetchall()[0][0]
    cursor.execute('INSERT INTO App_user (school_id,first_name,last_name,age,type,admin_id,approved) \
                   VALUES ({},"{}","{}",{},"{}",{},0)'.format(school_id,first_name,last_name,\
                    age,type,admin_id))
    mydb.commit()
    cursor.execute('SELECT user_id FROM App_user WHERE first_name = "{}" AND last_name = "{}"'.format(first_name,last_name))
    user_id = cursor.fetchall()[0][0]
    cursor.execute('INSERT INTO Authentication (user_id,username,password) VALUES ({},"{}","{}")'.format(user_id,username,password))
    mydb.commit()
    return {"data":"monument"}
    #return('success')

@app.route('/sex', methods=['POST','GET'])
def someshit():
    print("sex")
    data = request.get_json(['body'])
    print(data)
    return data

@app.route('/signin',methods = ['GET','POST'])
def sign_in():
    data = request.get_json(['body'])
    username = data['username']
    password = data['password']
    cursor.execute('SELECT user_id FROM Authentication WHERE username = "{}" AND password = "{}"'.format(username, password))
    try:
        cursor.fetchall()[0][0]
        print("success")
        return jsonify({"result":"success"})
    except:
        print("no user found")
        return jsonify({"result":"failure"})

@app.route('/hello')
def hello():
    return 'Hello'

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


