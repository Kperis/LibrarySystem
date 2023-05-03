from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'schooldatabasev4'

# mysql = MySQL(app)

# mydb = con.connect(
# host = "localhost",
# user = "root",
# password = "",
# database = "schooldatabasev4"
# )

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
    data = request.get_json(['body'])
    print(data)
    return('success')

@app.route('/sex', methods=['POST','GET'])
def someshit():
    data = request.get_json(['body'])
    print(data)
    return data



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


