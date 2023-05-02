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


