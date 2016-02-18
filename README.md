#Clubbr Application
Project for CSE 170/COGS 120

##Required installs before starting
* MongoDB

##Install Dependencies:
```
npm install
```

##Starting DB (localhost):
If it's your first time, do the following commands to setup directories for mongo:
```
mkdir data
cd data
mkdir db
cd ..
```
In order to run the database, one must manually start mongodb.  To run:
```
mongod --dbpath data/db
```
Note: This should be on a separate terminal in order for have db running.

##Starting Application:
To start our application, run the following command:
```
node server.js
```

##Loading Default User Data
There are default user credentials available at user.json file. To load these objects to database, before Node server is running, type:
```
node initDB.js
```

Heroku Site:
https://young-oasis-22630.herokuapp.com/
