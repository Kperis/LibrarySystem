# DATABASE-PROJECT
CONTRIBUTORS:

1.Dimitris Georgoulopoulos 03120862

2.Markos Kalogerakis  03119115

3.Konstantinos Perifanos  03120134

Requirements:
1) Python 3.10.6
2) Flask 2.3.2
3) Flask Cors 3.0.10
4) mysql connector 0.3.1
5) requests 2.31.0
6) Nodejs 18.15.0
7) react 18.2.0
8) react-router 6.11.0

INSTALLATION:

IMPORTANT NOTE!!! DO NOT RUN PYTHON SCRIPTS FROM (EXAMPLE) VSCODE. DO IT THROUGH A TERMINAL ALWAYS SO THAT THE FILEPATHS WORK CORRECTLY!!

1) clone the repository by running in terminal "git clone https://github.com/DSpaceT/DATABASE-PROJECT.git" then cd into the folder created.
2) Connect to preferred DBMS and run the create_schema.sql file that is within DATABASE-PROJECT/LIBRARY_DATABASE/sql_schemas
3) Then run the indexes.sql file to create required indexes.
4) Next, in the DATABASE-PROJECT folder run pip install -r requirements.txt to install dependencies and libraries.
5) Now the database is ready to get data. But before we do so make sure to configure a filepath according to your machine.
  Open backup_creator.py that is located in LIBRARY_DATABASE with your preferred text editor. At line 16 where the command os.chdir is located, make sure you point it to your mysql bin where mysqldump is located inorder to make sure that backup creation from main admin is available. This will ensure that mysqldump functions properly. For example on Linux with lampp installed the path is /opt/lampp/bin

Also make sure to insert your database credentials(preferably use sa user to have all privileges) at the top of insert_faker,API_Import, Borrow_Requests,faker_data,app,route_functions

example:
  host = "localhost",
  
  user = "root",
  
  password = "",
  
  database = "schooldatabasev4"

After that run the following python scripts that are within DATABASE-PROJECT/LIBRARY_DATABASE in this specific order:

  -insert_faker.py -> creates neccessary mock data
  
  -API_Import.py -> imports books and info from opelibrary.org
  
  -Borrow_Requests.py -> creates random borrow and requests for presentation
  
6)Finally cd into database_frontend and run "npm install" to install react dependencies.
7) In order to start the app:
  -Inside /LIBRARY_DATABASE run command 'flask --debug run --with-threads'. This will fire up the server/backend
  -Then cd into /database_frontend and run command 'npm start'

  FINAL NOTE: for the purpose of demonstration of user approval feature some admins/user are randomly not approved. If you wish sign in to main admin account with username 'test' and password 'test' and approve every admin. Likewise if a specific student or teacher is not approved the admin can approve them.
