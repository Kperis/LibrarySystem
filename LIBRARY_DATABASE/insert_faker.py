from faker_data import school_provider,user_provider

from faker import Faker
from flask import Flask,make_response,request,render_template
#from app import app
# from flask_mysqldb import MySQL
import mysql.connector as con
import random
import os



mydb = con.connect(
host = 'localhost',
user = 'root',
password = '',
database = 'schooldatabasev4',
)


fake = Faker('el_GR')

cursor = mydb.cursor(buffered = True)


def generate_card():
    found = False
    result = 0
    while found==False:
        card = random.randint(10**7,10**8-1)
        cursor.execute('SELECT * FROM App_user WHERE card={}'.format(card))
        temp_list = cursor.fetchall()
        if temp_list:
            continue
        else:
            found == True
            result = card
            break
    return result

#Βρίσκει τον αριθμό τον schools που υπάρχουν στο σύστημα 
def Number_of_Schools():
    cursor.execute('SELECT COUNT(*) FROM School')
    N = cursor.fetchall()[0][0]
    return N

#Προσθέτει στην βάση δεδομένων εναν συγκεκριμένο αριθμό σχολείων
def Insert_Schools(N_Schools):
    for i in range(N_Schools):
        school = school_provider(fake)
        principal = user_provider(fake)
        try:
            name = school.get_name()
            city = school.get_city()
            first_name = principal.get_first_name()
            last_name = principal.get_last_name()
            cursor.execute('INSERT INTO School (name,city,email,address,total_borrows,principal_first_name,principal_last_name) VALUES ("{}","{}","{}","{}",0,"{}","{}")'.format(name,city,school.get_email(),school.get_address(),first_name,last_name))
            phones = school.get_phones()
            cursor.execute('SELECT School.school_id FROM School WHERE School.name = "{}" AND School.city = "{}"'.format(name,city))
            school_id = cursor.fetchall()[0][0]
            for phone in phones:
                cursor.execute('INSERT INTO Phone (school_id,phone) VALUES ({},"{}")'.format(school_id,phone))
                mydb.commit()
        except:
            print("probably duplicate entry")
        # mydb.commit()

#Προσθέτει στην βάση δεδομένων έναν Admin για κάθε σχολείο
def Insert_Admins():
    cursor.execute('SELECT school_id FROM School ORDER BY RAND()')
    schools_ids = cursor.fetchall()
    for i in range(len(schools_ids)):
        user = user_provider(fake)
        school_id = cursor.execute('INSERT INTO App_user (school_id,admin_id,first_name,last_name,age,type,approved) VALUES(\
                                {},NULL,"{}","{}",{},"Admin",{})'.format(schools_ids[i][0],user.get_first_name(),user.get_last_name(),random.randint(24,65),random.randint(0,1)))
        mydb.commit()

#Προσθέτει στην βάση ένα συγκεκριμένο αριθμό App_user (Μαθητών ή Καθηγητών)
def Insert_Users(N_Users):
    N = Number_of_Schools()

    cursor.execute('SELECT App_user.user_id,App_user.school_id,App_user.approved FROM App_user WHERE App_user.type = "Admin" ORDER BY RAND()')
    data = cursor.fetchall()

    for i in range(N_Users):
        var = random.randint(0,N-1)
        admin_id = data[var][0]
        school_id = data[var][1]
        approved = data[var][2]
        user = user_provider(fake)
        if approved == 1:
            temp = random.randint(0,1)
            if temp == 1:
                card = generate_card()
                school_id = cursor.execute('INSERT INTO App_user (school_id,admin_id,first_name,last_name,age,type,card,approved) VALUES(\
                                        {},{},"{}","{}",{},"{}",{},{})'.format(school_id,admin_id,user.get_first_name(),\
                                        user.get_last_name(),user.get_age(),user.get_type(),card,temp))
                mydb.commit()
            else:
                school_id = cursor.execute('INSERT INTO App_user (school_id,admin_id,first_name,last_name,age,type,approved) VALUES(\
                                        {},{},"{}","{}",{},"{}",{})'.format(school_id,admin_id,user.get_first_name(),\
                                        user.get_last_name(),user.get_age(),user.get_type(),temp))
                mydb.commit()

        else :
            school_id = cursor.execute('INSERT INTO App_user (school_id,admin_id,first_name,last_name,age,type,approved) VALUES(\
                        {},{},"{}","{}",{},"{}",{})'.format(school_id,admin_id,user.get_first_name(),\
                        user.get_last_name(),user.get_age(),user.get_type(),0))
            mydb.commit()
   

def Insert_Authentication():
    cursor.execute('SELECT App_user.user_id\
                    FROM App_user')
    users_ids = cursor.fetchall()
    for user_id in users_ids:
        user = user_provider(fake)
        cursor.execute('INSERT INTO Authentication (user_id,username,password) VALUES ({},"{}","{}")'\
                       .format(user_id[0],user.get_username(),user.get_password()))
        mydb.commit()
    cursor.execute('INSERT INTO App_user(first_name,last_name,age,type,approved) VALUES("Eren","Yeager",42,"Main_Admin",1)')
    mydb.commit()
    cursor.execute('SELECT user_id FROM App_user WHERE type="Main_Admin"')
    temp = cursor.fetchall()[0][0]
    cursor.execute('INSERT INTO Authentication(user_id,username,password) VALUES({},"test","test")'.format(temp))
    mydb.commit()


#Αδειάζει όλα τα δεδομένα όλων των πινάκων της βάσης
def Empty_Tables():
    sql_file = open(os.getcwd()+'/sql_schemas/truncate_schema.sql')  
    
    sql_string = sql_file.read().split(';')
    print(sql_string)
    for row in sql_string:
        try:
            if(row[0] == '\n'):
                cursor.execute(row[1:])
            else:
                cursor.execute(row)
        except:
            print("error")

def Drop_Tables():
    
    sql_file = open(os.getcwd()+'/sql_schemas/drop_schema.sql')  
    
    sql_string = sql_file.read().split(';')
    print(sql_string)
    for row in sql_string:
        try:
            if(row[0] == '\n'):
                cursor.execute(row[1:])
            else:
                cursor.execute(row)
        except:
            print("error")
def backup():
    print(os.getcwd()+'/sql_schemas/schooldatabasev4-back_up.sql')
    #with open('C:\\Users\\ggeor\\Desktop\\vscode^ projects\\DATABASE-PROJECT\\LIBRARY_DATABASE\\sql_schemas\\schooldatabasev4-back_up.sql', 'r',encoding="utf8") as sql_file:
    with open(os.getcwd()+'/sql_schemas/schooldatabasev4-back_up.sql', 'r') as sql_file:
        try:
            result_iterator = cursor.execute(sql_file.read(), multi=True)
            for res in result_iterator:
                try:
                    print("Running query: ", res)  # Will print out a short representation of the query
                    print(f"Affected {res.rowcount} rows" )
                except Exception:
                    pass
            mydb.commit()
        except Exception:
            print('heyyy')
            pass

#Συνδιάζει τις παραπάνω συναρτήσεις
def create_objects(N_Schools,N_Users):
    Empty_Tables()
    Insert_Schools(N_Schools)
    Insert_Admins()
    Insert_Users(N_Users)
    Insert_Authentication()

#ΠΡΟΣΟΧΗ ΌΣΟ ΈΧΕΤΕ ΑΝΟΙΧΤΟ ΤΟΝ ΣΕΡΒΕΡ ΜΗΝ ΚΑΝΕΤΕ UNCOMMENT ΚΑΠΟΙΟ ΑΠΟ ΑΥΤΕΣ ΤΙΣ ΣΥΝΑΡΤΗΣΕΙΣ ΔΙΟΤΙ
#ΛΟΓΩ ΤΟΝ IMPORT ΠΟΥ ΘΑ ΓΙΝΟΥΝ ΘΑ ΤΡΕΞΕΙ ΜΑΖΙ ΜΕ ΤΟΝ ΣΕΡΒΕΡ ΚΑΙ ΘΑ ΔΙΑΓΡΑΨΕΙ ΠΙΘΑΝΟΝ ΔΕΔΟΜΕΝΑ ΑΠΟ
#ΤΗΝ ΒΑΣΗ
if __name__ == "__main__":
    create_objects(4,150)
    # Empty_Tables()
    # Drop_Tables()
    # backup()

    # create_objects(10,200)
    # Empty_Tables()
    # Drop_Tables()
    # backup()
    #Για να τρέξουμε ξεχωριστά τις συναρτήσεις πρέπει να το κάνουμε ακολουθώντας την συγκεκριμένη σειρά που φαίνεται παραπάνω
