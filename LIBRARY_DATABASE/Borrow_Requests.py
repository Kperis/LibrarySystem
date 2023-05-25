import requests
from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
import random
import json
import datetime
from datetime import timedelta

mydb = con.connect(
host = "localhost",
user = "root",
password = '',#"ChoedanKal2002",
database = "schooldatabasev4"
)

cursor = mydb.cursor(buffered = True)

cursor.execute('SELECT * FROM App_user WHERE type="Μαθητής" OR type="Καθηγητής" ORDER BY RAND()')
data = cursor.fetchall()

for i in range(80):
    result = data[random.randint(0,len(data)-1)]
    user_id = result[0]
    school_id = result[1]
    cursor.execute('SELECT isbn,copies FROM Stores WHERE Stores.school_id={} ORDER BY RAND() LIMIT 1'.format(school_id))
    isbn = cursor.fetchall()[0][0]
    start_date = datetime.date(2023, 1, 1)
    end_date = datetime.date(2023,5,10)
    num_days = (end_date-start_date).days
    rand_days = random.randint(1,num_days)
    random_date = start_date + datetime.timedelta(days=rand_days)
    return_date = random_date + datetime.timedelta(days=7)
    cursor.execute('INSERT INTO Borrow(isbn,user_id,return_date,acquire_date,active) VALUES({},{},"{}","{}",0)'.format(isbn,user_id,return_date,random_date))
    mydb.commit()
    cursor.execute('SELECT School.total_borrows FROM School WHERE School.school_id = {}'.format(school_id))
    total_borrows = cursor.fetchall()[0][0]
    cursor.execute('UPDATE School SET School.total_borrows = {} WHERE School.school_id = {}'.format(total_borrows+1,school_id))
    mydb.commit()
    
    