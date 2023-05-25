from faker import Faker
from flask import Flask,make_response,request,render_template
from app import app#,mysql
from flask_mysqldb import MySQL
import mysql.connector as con
import random


mydb = con.connect(
host = "localhost",
user = "root",
password = "",
database = "schooldatabasev4"
)


fake = Faker('el_GR')

#Δημιουργεί κάποια απο τα απαραίτητα πεδία του school με χρήση της faker
class school_provider:
    num_of_schools = 0
    def __init__(self,fake):
        school_provider.num_of_schools += 1
        self.address_city = fake.address()
        self.name_num = random.randint(0,30)
        self.email = fake.email()
        self.type = ['Λύκειο','Γυμνάσιο','Δημοτικό','Νηπιαγωγείο']
    def get_city(self):
        address_city_list = self.address_city.split(' ')
        city_name = address_city_list[len(address_city_list)-1]
        return city_name
    def get_address(self):
        address = self.address_city.split(',')[0]
        return address
    def get_email(self):
        email_of = self.email
        return email_of
    def get_name(self):
        number = self.name_num
        school_type = self.type[random.randint(0,3)]
        return '{}o {}'.format(number,school_type)
    def get_phones(self):
        result = []
        for i in range(random.randint(1,3)):
            result.append(fake.phone_number())
        return result

#Δημιουργεί κάποια απο τα απαραίτητα πεδία του App_user με χρήση της faker
class user_provider:
    num_of_users = 0
    def __init__(self,fake):
        user_provider.num_of_users+=1
        self.profile = fake.simple_profile()
        self.type = random.choices(['Μαθητής', 'Καθηγητής', 'Χειριστής','Κεντρικός Χειριστής'],weights = [90,10,0,0])
    def get_first_name(self):
        return self.profile['name'].split(' ')[0]
    def get_last_name(self):
        return self.profile['name'].split(' ')[1]
    def get_type(self):
        return self.type[0]
    def get_age(self):
        age = 0
        if(self.type[0] == 'Μαθητής'):
            age = random.randint(10,18)
        else:
            age = random.randint(24,65)
        return age
    def get_username(self):
        return self.profile['username']
    def get_password(self):
        return fake.password()
    def delete(self):
        user_provider.num_of_users-=1


