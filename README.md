# DATABASE-PROJECT
CONTRIBUTORS:
1.Dimitris Georgoulopoulos
2.Markos Kalogerakis
3.Konstantinos Perifanos

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

1) clone the repository by running in terminal git clone https://github.com/DSpaceT/DATABASE-PROJECT.git then cd into the folder created.
2) Connect to preffered DBMS and run the create_schema.sql file that is within DATABASE-PROJECT/LIBRARY_DATABASE/sql_schemas
3) Then run the indexes.sql file to create required indexes.
4) Now in the DATABASE-PROJECT folder run pip install -r requirements.txt to install dependencies and libraries.
5) Now the database is ready to get data. Run the following python scripts that are within DATABASE-PROJECT/LIBRARY_DATABASE in this specific order:
  -insert_faker.py
  -API_Import.py
  -Borrow_Requests.py
6)Finally cd into database_frontend and run npm install react-router-dom@6
7) Now that everything is setup run npm start. This starts the flask server and opens frontend application.
