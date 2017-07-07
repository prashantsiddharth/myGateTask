# myGateTask
Task to build some apis that allows following operations on given data about Food Trucks in San Francisco :
1) Search by name of applicant
2) Search by expiration date, to find whose permits have expired
3) Search by street name
4) Add/Delete new food truck entry to the data­set
5) Auto expiry of licenses.
6) Given one or multiple locations, predict which truck will be	 the best one to assign the job.	

Description : For completing this task loopback framework is used. LoopBack is a highly-extensible, open-source Node.js framework that enables us to create dynamic end-to-end REST APIs and Access data from major relational databases, MongoDB, SOAP and REST APIs. DataBase that is being used is MongoDB.
This project contains 3 main folders : Client, Common and Server
Client is currently empty because there are no pages which can be seen for UI. Server folder contains our server and all files which are required to connect with database etc. 
Common folder contains our models, which is to be accessed by server and client both. This folder has a subfolder called Models, inside that there is our model which I have named as FoodTruck. There is two main files. food-truck.js and food-truck.json.
food-truck.json contains all the properties(attributes) which our model should have like  applicant's name, expirationDate, Latitute and Longitude. These attributs have been taken from the link given for thr data set : https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data
For testing model instanecs(data) has been created from here only. Data we can post in json format in our model. Then there is food-truck.js, this file contains the code for all apis. There are multiple remote methods for different queries. 

Installations Needed : 
1) MongoDb : https://www.mongodb.com/download-center#community 
2) Node.js : https://nodejs.org/en/download/
3) Loopback : with command 'npm install -g loopback-cli' (install node first and the loopback)
4) npm  :  run command 'npm install' (used for the purpose of installing npm packages, it will make a npm-package folder and install all packages there)

Make sure that you have C:\data\db (data folder inside C directory and inside that db folder : MongoDb's default folder to store data). 

Running the tests :
1) Search by name of applicant : 


