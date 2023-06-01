import os
import time

def run_backup_creator():
    current_dir = os.getcwd()
    print(current_dir)
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASS = ''
    DB_NAME = 'schooldatabasev4'

    BACKUP_DIR = os.getcwd()+'/LIBRARY_DATABASE/sql_schemas'#'./'
    print(BACKUP_DIR)
    print(type(BACKUP_DIR))


    os.chdir("C:\\xampp\\mysql\\bin")
    backup_file = f'{DB_NAME}-back_up.sql'
    backup_file_path = os.path.join(BACKUP_DIR,backup_file)

    # mysqldump_cmd = f'mysqldump -h {DB_HOST} -u {DB_USER} -p {DB_PASS} {DB_NAME} > {backup_file_path}'
    mysqldump_cmd = f'mysqldump -u {DB_USER} {DB_PASS} {DB_NAME} > {backup_file_path}'
    os.system(mysqldump_cmd)
    os.system(f'{DB_PASS}')

#print('{}'.format(os.getcwd()))
if __name__ == "__main__":
    run_backup_creator()