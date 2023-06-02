import os
import time

def run_backup_creator():
    current_dir = os.getcwd()
    print(current_dir)
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASS = ''
    DB_NAME = 'schooldatabasev4'

<<<<<<< HEAD
    BACKUP_DIR = os.getcwd()+'LIBRARY_DATABSE/sql_schemas'
=======
    temp = os.getcwd()
    BACKUP_DIR = os.getcwd()+'/sql_schemas'
>>>>>>> 538b21490789d26896be2a2737b2dad05879503a


    os.chdir("C:\\xampp\\mysql\\bin")
    # print(os.getcwd())
    backup_file = f'{DB_NAME}-back_up.sql'
    backup_file_path = os.path.join(BACKUP_DIR,backup_file)

    # mysqldump_cmd = f'mysqldump -h {DB_HOST} -u {DB_USER} -p {DB_PASS} {DB_NAME} > {backup_file_path}'
    mysqldump_cmd = f'mysqldump --socket=/opt/lampp/var/mysql/mysql.sock --column-statistics=0 -u {DB_USER} {DB_PASS} {DB_NAME} > {backup_file_path};'
    os.system(mysqldump_cmd)
    os.system(f'{DB_PASS}')

    os.chdir(temp)

#print('{}'.format(os.getcwd()))
if __name__ == "__main__":
    run_backup_creator()