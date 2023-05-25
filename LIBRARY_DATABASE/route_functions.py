import app
from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import jsonify
import datetime



mydb = con.connect(
host = "localhost",
user = "root",
password = "",#"ChoedanKal2002",
database = "schooldatabasev4"
)



cursor = mydb.cursor(buffered = True)



def print_aaa():
    print("hello from other file")

def fuser_username(username):
    cursor.execute('SELECT user_id FROM Authentication WHERE Authentication.username = "{}"'.format(username))
    user_id = cursor.fetchall()[0][0]
    return user_id
def fschool_name_city(school_name,city):
    cursor.execute('SELECT school_id FROM School WHERE School.name = "{}" AND School.city = "{}"'.format(school_name,city))
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
    # user_id = fuser_username(username)
    # cursor.execute('SELECT ')
    cursor.execute('SELECT Books.isbn,Books.title,Books.m_cover_path,Authentication.username,App_user.first_name,App_user.last_name,\
                    DATE_FORMAT(Borrow.return_date,"%m/%d/%Y"),DATE_FORMAT(Borrow.acquire_date,"%m/%d/%Y")\
                    FROM Authentication\
                    JOIN App_user\
                    ON App_user.user_id = Authentication.user_id\
                    JOIN Borrow\
                    ON Borrow.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Borrow.isbn\
                    WHERE Authentication.username = "{}" AND Borrow.active=1'.format(username))
    result = cursor.fetchall()
    mydb.commit()

    return result

def fborrow_school(username):
    cursor.execute('SELECT user_id FROM Authentication WHERE username="{}"'.format(username))
    admin_id = cursor.fetchall()[0][0]
    cursor.execute('SELECT Borrow.borrow_id,Books.isbn,Books.title,Authentication.username,App_user.first_name,App_user.last_name,App_user.type\
                   ,DATE_FORMAT(Borrow.return_date,"%m/%d/%Y"),DATE_FORMAT(Borrow.acquire_date,"%m/%d/%Y")\
                    FROM Authentication\
                    JOIN App_user\
                    ON Authentication.user_id = App_user.user_id\
                    JOIN Borrow\
                    ON Borrow.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Borrow.isbn\
                    WHERE App_user.admin_id = {} AND Borrow.active=1'.format(admin_id))
    

    result = cursor.fetchall()
    mydb.commit()
    return result
def fbook_title(title):
    cursor.execute('SELECT Books.isbn FROM Books WHERE Books.title = "{}"'.format(title))
    result = cursor.fetchall()[0][0]
    return result
def frequest_username(username):
    print('hi')
    cursor.execute('SELECT Books.isbn,Books.title,Books.m_cover_path,Authentication.username,App_user.first_name,App_user.last_name,\
                    DATE_FORMAT(Request.date_of_request, "%m/%d/%Y")\
                    FROM Authentication\
                    JOIN App_user\
                    ON Authentication.user_id = App_user.user_id\
                    JOIN Request\
                    ON Request.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Request.isbn\
                    WHERE Authentication.username = "{}"'.format(username))
   
    result = cursor.fetchall()
    mydb.commit()
    return result
    
def frequest_school(username):
    cursor.execute('SELECT Authentication.user_id FROM Authentication WHERE Authentication.username = "{}"'.format(username))
    admin_id = cursor.fetchall()[0][0]
    cursor.execute('SELECT school_id FROM App_user WHERE user_id={}'.format(admin_id))
    school_id=cursor.fetchall()[0][0]
    cursor.execute('SELECT Request.request_id,Stores.copies,Books.isbn,Books.title,Authentication.username,App_user.first_name,App_user.last_name,App_user.type,\
                    DATE_FORMAT(Request.date_of_request,"%m/%d/%Y")\
                    FROM App_user\
                    JOIN Request\
                    ON Request.user_id = App_user.user_id\
                    JOIN Books\
                    ON Books.isbn = Request.isbn\
                    JOIN Stores ON Stores.isbn=Books.isbn\
                    JOIN Authentication ON Authentication.user_id=App_user.user_id \
                    WHERE App_user.admin_id = {} AND Stores.school_id={}' .format(admin_id,school_id))
    result = cursor.fetchall()
    print(result)
    mydb.commit()
    return result
def freview_isbn_approved(isbn):
    cursor.execute('SELECT DATE_FORMAT(Review.date_of_review,"%m/%d/%Y"),Review.score,Review.description,App_user.first_name,App_user.last_name,Review.approved \
            FROM Review JOIN App_user ON Review.user_id = App_user.user_id \
            WHERE Review.isbn={} AND Review.approved = 1'.format(isbn))
    result = cursor.fetchall()
    mydb.commit()
    return result
def fschool_username(username):
    cursor.execute('SELECT School.school_id \
                   FROM School \
                   JOIN App_user \
                   ON App_user.school_id = School.school_id \
                   JOIN Authentication \
                   ON Authentication.user_id = App_user.user_id \
                   WHERE Authentication.username = "{}"'.format(username))
    result = cursor.fetchall()[0][0]
    return result
def freview_school(school_id):
    cursor.execute('SELECT DATE_FORMAT(Review.date_of_review,"%m/%d/%Y"),Review.score,Review.description,\
                   Authentication.username,App_user.first_name,App_user.last_name,Review.approved,Books.title,Books.isbn \
                   FROM Review \
                   JOIN App_user \
                   ON App_user.user_id = Review.user_id \
                   JOIN Authentication ON Authentication.user_id=App_user.user_id \
                   JOIN Books ON Books.isbn=Review.isbn \
                   WHERE App_user.school_id = {} AND Review.approved = 0'.format(school_id))
    result = cursor.fetchall()
    mydb.commit()
    return result

def fmean_score_user(school_id):
    cursor.execute('SELECT App_user.user_id,App_user.first_name,App_user.last_name,ROUND(AVG(Review.score),2) \
                   FROM Review \
                   JOIN App_user \
                   ON Review.user_id = App_user.user_id \
                   JOIN School \
                   ON School.school_id = App_user.school_id \
                   WHERE School.school_id = {} AND Review.approved = 1 GROUP BY App_user.user_id'.format(school_id))
    data = cursor.fetchall()
    mydb.commit()
    # user_id_list = []
    # result = []
    # for item in data:
    #     if user_id_list.count(item[0]) == 0:
    #         user_id_list.append(item[0])
    #         dictionary = {}
    #         dictionary['user_id'] = item[0]
    #         dictionary['first_name'] = item[1]
    #         dictionary['last_name'] = item[2]
    #         result.append(dictionary)

    # for i in range(len(user_id_list)):
    #      result[i]['mean'] = 0
    #      result[i]['number'] = 0
    # for item in data:
    #     for i in range(len(result)):
    #         if result[i]['user_id'] == item[0]:
    #             break
    #     result[i]['number'] += 1
    #     result[i]['mean'] += item[3]
    return data    
    


def fallborrows_schools(month):
    months = ['January','February','March','April','May','June','July','August','September','October','November','December','all']
    num_month = 0
    for i in range(len(months)):
        if month == months[i]:
            num_month = i+1
            break
    if month == 'all':
        cursor.execute('SELECT School.name,School.city,School.school_id,COUNT(*) AS count_ev \
                        FROM Borrow \
                        INNER JOIN Books \
                        ON Books.isbn = Borrow.isbn \
                        INNER JOIN App_user \
                        ON App_user.user_id = Borrow.user_id \
                        INNER JOIN School \
                        ON School.school_id = App_user.school_id \
                        WHERE YEAR(Borrow.acquire_date) = YEAR(CURDATE()) \
                        GROUP BY School.school_id ORDER BY count_ev DESC;')
        result = cursor.fetchall()
        return result

    else:    
        cursor.execute('SELECT School.name,School.city,School.school_id,COUNT(*) AS count_ev \
                        FROM Borrow \
                        INNER JOIN Books \
                        ON Books.isbn = Borrow.isbn \
                        INNER JOIN App_user \
                        ON App_user.user_id = Borrow.user_id \
                        INNER JOIN School \
                        ON School.school_id = App_user.school_id \
                        WHERE MONTH(Borrow.acquire_date) = {} \
                        GROUP BY School.school_id ORDER BY count_ev DESC;'.format(num_month))
        result = cursor.fetchall()
        return result



def fauthors_categories(category):
    result = []
    cursor.execute('SELECT Authors.first_name,Authors.last_name \
                    FROM Authors \
                    INNER JOIN Books \
                    ON Books.isbn = Authors.isbn \
                    INNER JOIN Categories \
                    ON Books.isbn = Categories.isbn \
                    WHERE Categories.category = "{}" \
                    GROUP BY Authors.first_name,Authors.last_name;'.format(category))
    data = cursor.fetchall()

    for item in data:
        result.append(str(item[0])+' '+str(item[1]))

    return result



def fteachers_category(category):
    result = []
    cursor.execute('SELECT CONCAT(App_user.first_name," ",App_user.last_name) \
                    FROM App_user \
                    INNER JOIN Borrow \
                    ON Borrow.user_id = App_user.user_id \
                    INNER JOIN Books \
                    ON Books.isbn = Borrow.isbn \
                    INNER JOIN Categories \
                    ON Categories.isbn = Books.isbn \
                    WHERE Categories.category = "{}" AND App_user.type = "Καθηγητής" \
                    GROUP BY App_user.first_name,App_user.last_name;'.format(category))
    data = cursor.fetchall()

    for item in data:
        result.append(item[0])

    return result

def top_teachers():
    result = []
    cursor.execute('SELECT CONCAT(App_user.first_name," ",App_user.last_name) ,COUNT(*) AS count_borrows\
                    FROM App_user \
                    INNER JOIN Borrow \
                    ON Borrow.user_id = App_user.user_id \
                    INNER JOIN Books \
                    ON Books.isbn = Borrow.isbn \
                    WHERE App_user.age < 40 AND App_user.type = "Καθηγητής" \
                    GROUP BY App_user.first_name,App_user.last_name ORDER BY count_borrows DESC\
                    LIMIT 10;')
    data = cursor.fetchall()
    for item in data:
        result.append(str(item[0])+' '+str(item[1]))
    return result




def fno_borrows_authors():
    result = []
    cursor.execute('SELECT first_name,last_name,isbn FROM ( \
                    SELECT Authors.first_name,Authors.last_name,Borrow.isbn \
                    FROM Authors \
                    INNER JOIN Books \
                    ON Books.isbn = Authors.isbn \
                    LEFT JOIN Borrow \
                    ON Borrow.isbn = Books.isbn \
                    WHERE Borrow.isbn IS NULL \
                    ) o \
                    WHERE CONCAT(o.first_name," ",o.last_name) NOT IN ( \
                    SELECT CONCAT(Authors.first_name," ",Authors.last_name) \
                    FROM Authors \
                    INNER JOIN Books \
                    ON Books.isbn = Authors.isbn \
                    LEFT JOIN Borrow \
                    ON Borrow.isbn = Books.isbn \
                    WHERE Borrow.isbn IS NOT NULL) \
                    GROUP BY first_name,last_name;')
    data = cursor.fetchall()
    for item in data:
        result.append(str(item[0])+' '+str(item[1]))
    return result
def same_borrows_admin():

    cursor.execute('SELECT CONCAT(App_user.first_name," ",App_user.last_name),o.count_ev \
                    FROM App_user \
                    JOIN (SELECT App_user.admin_id,COUNT(*) AS count_ev,Borrow.acquire_date \
                        FROM App_user \
                        INNER JOIN School \
                        ON School.school_id = App_user.school_id \
                        INNER JOIN Borrow \
                        ON Borrow.user_id = App_user.user_id \
                        GROUP BY App_user.admin_id \
                        HAVING COUNT(*) > 0) o \
                    ON App_user.user_id = o.admin_id \
                    --WHERE o.count_ev > 0 AND YEAR(o.acquire_date) = 2023 \
                    WHERE o.count_ev > 20 AND YEAR(o.acquire_date) = YEAR(CURDATE()) \
                    ORDER BY o.count_ev;')
    data = cursor.fetchall()
    num = 0
    dir = {}
    for i in range(len(data)):
        dir[data[i][1]] = []
    for item in data:
        dir[item[1]].append(item[0])
    
    return dir

        

def ffive_less_topauthor():
    result = []
    cursor.execute('SELECT CONCAT(first_name," ",last_name) \
                    FROM \
                            (SELECT Authors.first_name,Authors.last_name,COUNT(*) AS count_ev, \
                            (SELECT MAX(o.count_ev)  \
                                    FROM (  SELECT Authors.first_name,Authors.last_name,COUNT(*) AS count_ev \
                                            FROM Authors \
                                            INNER JOIN Books \
                                            ON Books.isbn = Authors.isbn \
                                            GROUP BY Authors.first_name,Authors.last_name) o ) AS max_value \
                            FROM Authors \
                            INNER JOIN Books \
                            ON Books.isbn = Authors.isbn \
                            GROUP BY Authors.first_name,Authors.last_name \
                    ) o \
                    WHERE o.count_ev <= o.max_value - 5;')   
    data = cursor.fetchall()
    for item in data:
        result.append(item[0]) 
    return result

def top_three_comb():
    result = []
    cursor.execute('SELECT l.first_category,l.second_category,count_combination \
                    FROM ( \
                            SELECT o.user_id AS user_id_1,k.user_id AS user_id_2,CONCAT(o.category," ",k.category) AS category_comb,COUNT(*) as count_combination,o.category AS first_category,k.category AS second_category \
                            FROM ( \
                                    SELECT Borrow.isbn,Borrow.user_id,Categories.category,Borrow.borrow_id \
                                    FROM Borrow \
                                    INNER JOIN Books \
                                    ON Books.isbn = Borrow.isbn \
                                    INNER JOIN Categories \
                                    ON Categories.isbn = Books.isbn) o \
                            INNER JOIN ( \
                                    SELECT Borrow.isbn,Borrow.user_id,Categories.category,Borrow.borrow_id \
                                    FROM Borrow \
                                    INNER JOIN Books \
                                    ON Books.isbn = Borrow.isbn \
                                    INNER JOIN Categories \
                                    ON Categories.isbn = Books.isbn) k \
                            ON o.borrow_id = k.borrow_id \
                            WHERE o.category != k.category \
                            GROUP BY category_comb) l \
                    ORDER BY count_combination DESC \
                    LIMIT 6;')
    data = cursor.fetchall()
    for item in data:
        if result.count((str(item[0])+' '+str(item[1])+' '+str(item[2]))) == 0 and result.count((str(item[1])+' '+str(item[0])+' '+str(item[2]))) == 0:
            result.append(str(item[0])+' '+str(item[1])+' '+str(item[2]))
    return result

def insert_user(school_id,first_name,last_name,age,type,admin_id):
    cursor.execute('INSERT INTO App_user (school_id,first_name,last_name,age,type,admin_id,approved) \
                VALUES ({},"{}","{}",{},"{}",{},0)'.format(school_id,first_name,last_name,age,type,admin_id))
    mydb.commit()
    return

def insert_authentication(user_id,username,password):
    cursor.execute('INSERT INTO Authentication (user_id,username,password) VALUES ({},"{}","{}")'.format(user_id,username,password))
    mydb.commit()
    return

def notactive_borrow(user_id,isbn):
    cursor.execute('UPDATE Borrow SET Borrow.active = 0 WHERE user_id={} AND isbn={}'.format(user_id,isbn))
    mydb.commit()
    cursor.execute('SELECT school_id FROM App_user WHERE user_id={}'.format(user_id))
    school_id = cursor.fetchall()[0][0]
    cursor.execute('UPDATE Stores SET copies=copies+1 WHERE isbn={} AND school_id={}'.format(isbn,school_id))
    mydb.commit()
    return
def delete_request(user_id,isbn):
    cursor.execute('DELETE FROM Request WHERE user_id = {} AND isbn = {}'.format(user_id,isbn))
    mydb.commit()
    cursor.execute('INSERT INTO Borrow(isbn,user_id,acquire_date,return_date,active) VALUES({},{},CURDATE(),CURDATE(),1)'.format(isbn,user_id))
    mydb.commit()
    cursor.execute('SELECT school_id FROM App_user WHERE user_id={}'.format(user_id))
    school_id = cursor.fetchall()[0][0]
    cursor.execute('UPDATE Stores SET copies=copies-1 WHERE isbn={} AND school_id={}'.format(isbn,school_id))
    mydb.commit()
    cursor.execute('SELECT School.total_borrows FROM School WHERE School.school_id = {}'.format(school_id))
    total_borrows = cursor.fetchall()[0][0]
    cursor.execute('UPDATE School SET School.total_borrows = {} WHERE School.school_id = {}'.format(total_borrows+1,school_id))
    mydb.commit()
    return

def delete_review(isbn,username):
    user_id = fuser_username(username)
    cursor.execute('DELETE FROM Review WHERE Review.isbn = {} AND Review.user_id = {}'.format(isbn,user_id))
    mydb.commit()
    return

def delete_user_request(user_id,isbn):
    cursor.execute('DELETE FROM Request WHERE user_id = {} AND isbn = {}'.format(user_id,isbn))
    mydb.commit()
    return
    
def approve_review(isbn,username):
    user_id = fuser_username(username)
    cursor.execute('UPDATE Review \
                   SET Review.approved = 1 \
                   WHERE Review.isbn = {} AND Review.user_id = {}'.format(isbn,user_id))
    mydb.commit()
    return

