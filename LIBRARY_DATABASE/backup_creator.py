import os
import time

def run_backup_creator():
    current_dir = os.getcwd()
    print(current_dir)
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASS = ''
    DB_NAME = 'schooldatabasev4'

    temp = os.getcwd()
    BACKUP_DIR = os.getcwd()+'/sql_schemas'


    os.chdir("/opt/lampp/bin")
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