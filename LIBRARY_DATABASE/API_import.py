import requests
from flask import Flask,make_response,request,render_template
from flask_mysqldb import MySQL
import mysql.connector as con
import random
import json

mydb = con.connect(
host = "localhost",
user = "root",
password = '',#"ChoedanKal2002",
database = "schooldatabasev4"
)

cursor = mydb.cursor(buffered = True)

def random_category_inserter(category):
    random_categories = []
    random_categories.append(category)
    list_of_categories = ['science fiction','fantasy','romance','mystery','drama','action & adventure','history']
    if category == 'science fiction':
        for i in range(random.randint(0,2)):
            random_categories.append(random.choices(list_of_categories,weights = [0,50,10,5,10,25,0])[0])
    elif category == 'fantasy':
        for i in range(random.randint(0,2)):
            random_categories.append(random.choices(list_of_categories,weights = [10,0,20,20,15,35,0])[0])
    elif category == 'romance':
        for i in range(random.randint(0,2)):
            random_categories.append(random.choices(list_of_categories,weights = [10,20,0,20,40,10,0])[0])
    elif category == 'mystery':
        for i in range(random.randint(0,2)):
            random_categories.append(random.choices(list_of_categories,weights = [10,20,10,0,40,15,5])[0])
    elif category == 'drama':
        for i in range(random.randint(0,2)):
            random_categories.append(random.choices(list_of_categories,weights = [10,20,40,10,0,15,5])[0])
    elif category == 'action_&_adventure':
        for i in range(random.randint(0,2)):
            random_categories.append(random.choices(list_of_categories,weights = [40,30,5,15,10,0,0])[0])
    else:
        print("nothing of the above")
    return random_categories

def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)

def Number_of_Schools():
    cursor.execute('SELECT COUNT(*) FROM School')
    N = cursor.fetchall()[0][0]
    return N

def Insert_Books(isbn,page_count,publisher,title,summary,s_cover_path,m_cover_path):
        try:
            cursor.execute('INSERT INTO Books (isbn,page_count,publisher,title,summary,cover_path,m_cover_path) VALUES ({},{},"{}","{}","{}","{}","{}")'\
                    .format(int(isbn),page_count,publisher[0],title,summary[:699],s_cover_path,m_cover_path))
            mydb.commit()
        except:
            print("error in book insert")

def Insert_Stores(isbn):
    N = Number_of_Schools()
    try:
        cursor.execute('SELECT school_id FROM School ORDER BY RAND()')
        school_id = cursor.fetchall()
        for i in range(random.randint(1,N)):
            copies = random.randint(0,20)
            school_id_var = school_id[i][0]
            cursor.execute('INSERT INTO Stores (isbn,school_id,copies) VALUES ({},{},{})'.format(isbn,school_id_var,copies))
            mydb.commit()
    except:
        print("error in store insert")

def Insert_Categories(isbn,Categories):
    random_categories = random_category_inserter(Categories)
    for category in random_categories:
        try:
            cursor.execute('INSERT INTO Categories (isbn,category) VALUES ({},"{}")'.format(isbn,category))
            mydb.commit()
        except:
            print("error in category insert")

def Insert_Keywords(isbn,keyword):
    for i in range(len(keyword)):
        try:
            cursor.execute('INSERT INTO Keywords (isbn,keyword) VALUES ({},"{}")'.format(isbn,keyword[i]))
            mydb.commit()
        except:
            print("error in keyword insert")

def Insert_Authors(isbn,author):
    for i in range(len(author)):
        try:
            full_name = author[i].split(' ')
            first_name =""
            last_name = ""
            if len(full_name) == 1:
                first_name = full_name[0]
            else:
                first_name = full_name[0]
                last_name = full_name[1]
            cursor.execute('INSERT INTO Authors (isbn,first_name,last_name) VALUES ({},"{}","{}")'.format(isbn,first_name,last_name))
            mydb.commit()
        except:
            print("error in author insert")

def list_authors(authores):
    author_names = []
    for i in range(len(authores)):
        author_names.append(authores[i]['name'])
    if len(authores)>1:
        print(author_names)
    return author_names


No_of_books = 200

list_of_categories = ['science_fiction','fantasy','romance','mystery','drama','action_&_adventure','history']

for i in range(len(list_of_categories)):

    var = No_of_books//len(list_of_categories)

    response = requests.get('https://openlibrary.org/subjects/{}.json?limit={}'.format(list_of_categories[i],var))
    #
        # if i == 0:
        #     response = requests.get('https://openlibrary.org/subjects/science_fiction.json?limit={}'.format(No_of_books))
        # elif i == 1:
        #     response = requests.get('https://openlibrary.org/subjects/juvenile_literature.json?limit={}'.format(No_of_books))

    data = response.json()
    #jprint(data)
    for i in range(var):
        try:
            categories = data['name']
            authores = data['works'][i]['authors']
            author = list_authors(authores)
            print("NUMBER OF AUTHORS = ",len(author))
            olid_id = data['works'][i]['availability']['openlibrary_edition']
            print("ID = ",olid_id)
            works_di = data['works'][i]['key']
            response_works = requests.get("https://openlibrary.org{}.json".format(works_di))
            response_id = requests.get("https://openlibrary.org/books/{}.json".format(olid_id))
            response_id_json = response_id.json()
            response_works_json = response_works.json()
            #jprint(response_works_json)
            try:
                title = response_id_json['title']
            except:
                print("no title found")
            try:
                publishers = response_id_json['publishers']
            except:
                publishers = "no publisher found"
            try:
                page_count = response_id_json['number_of_pages']
            except:
                print("no number of pages found")
            try:
                s_cover_path = "https://covers.openlibrary.org/b/OLID/{}-S.jpg".format(data['works'][i]['cover_edition_key'])
                m_cover_path = "https://covers.openlibrary.org/b/OLID/{}-M.jpg".format(data['works'][i]['cover_edition_key'])
                #print("https://covers.openlibrary.org/b/OLID/{}-L.jpg".format(data['works'][i]['cover_edition_key']))
            except:
                s_cover_path = "no small cover url found"
                m_cover_path = "no medium cover url found"
            try:
                summary = response_works_json['description'][:699]
            except:
                summary = "no description found"
            try:
                subjects = response_works_json['subjects'][:10]
            except:
                print("no subjects found")
            #categories , author, olid_id[2:len(olid_id)-1],title, publishers, page_count, cover_url, m_cover_url, summary, subjects
            book_insertion = False
            try:
                Insert_Books(olid_id[2:len(olid_id)-1],page_count,publishers,title,summary,s_cover_path,m_cover_path)
                book_insertion = True
            except:
                pass
            try:
                if book_insertion == True:
                    Insert_Stores(olid_id[2:len(olid_id)-1])
            except:
                pass
            try:
                if book_insertion == True:
                    Insert_Categories(olid_id[2:len(olid_id)-1],categories)
            except:
                pass
            try:
                if book_insertion == True:
                    Insert_Keywords(olid_id[2:len(olid_id)-1],subjects)
            except:
                pass
            try:
                if book_insertion == True:
                    Insert_Authors(olid_id[2:len(olid_id)-1],author)
            except:
                pass
            print("\n")
        except:
            pass

print("END OF PROGRAMM")
cursor.close()
