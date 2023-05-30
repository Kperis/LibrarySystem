import os
import time
from app import backup_running

def run_backup_creator(var):
    current_dir = os.getcwd()
    print(current_dir)
    DB_HOST = 'localhost'
    DB_USER = 'root'
    DB_PASS = ''
    DB_NAME = 'schooldatabasev4'

    BACKUP_DIR = 'C:\\users\\ggeor\\backup_database_project'

    date_format = '%Y-%m-%d_%H-%M-%S'

    BACKUP_INTERVAL = 60

    while var:
        os.chdir("C:\\xampp\\mysql\\bin")
        current_time = time.strftime(date_format)
        current_time = current_time[0:16]
        backup_file = f'{DB_NAME}-{current_time}.sql'
        backup_file_path = os.path.join(BACKUP_DIR,backup_file)

        # mysqldump_cmd = f'mysqldump -h {DB_HOST} -u {DB_USER} -p {DB_PASS} {DB_NAME} > {backup_file_path}'
        mysqldump_cmd = f'mysqldump -u {DB_USER} {DB_PASS} {DB_NAME} > {backup_file_path}'
        os.system(mysqldump_cmd)
        os.system(f'{DB_PASS}')
        # gzip_cmd = f'zip {backup_file_path}'
        # os.system(gzip_cmd)
        var = str(int(current_time[14:16])-1)
        if len(var) < 2:
            var = "0"+var

        current_time = current_time[0:14]+var#+current_time[16:19]
        print(current_time)
        print(type(current_time))
        try:
            find_cmd = f'del {BACKUP_DIR}\\{DB_NAME}-{current_time}.sql'
            # find_cmd = f'find {BACKUP_DIR} -type f -name "*.sql" -mtime +7 -delete'
            os.system(find_cmd)
        except:
            print("file not found")

        time.sleep(BACKUP_INTERVAL)
run_backup_creator(backup_running)