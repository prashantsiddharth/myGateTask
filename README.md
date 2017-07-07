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


Running Servers :
go to the project directory
a) Run MongoDb Server  (C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe)
b) Run Command 'node .' on console


Running the tests : (Host and port are assigned as localhost and 3000 in server file)(running through postman would be best as explained down. Please post some data through postman as explained in 4(a) before testing other apis)
1) Search by name of applicant : http://localhost:3000/api/FoodTrucks/getByName?name=SOMENAMETOSEARCH  (It will give data of all applicants having name as SOMENAMETOSEARCH)
2) Search by expiration date : http://localhost:3000/api/FoodTrucks/getByExpirationDate  (It will give all the data with expiration date less than current date)
3) Search by Street Name : http://localhost:3000/api/FoodTrucks/findByLocation?lat=SOMELATITUDE&lng=SOMELONGITUDE (two inputs, latitude and longitude. It will give the detail of data having latitude as SOMELATITUDE and longitude as SOMELONGITUDE)
4) a) Add new entry to the data set : http://localhost:3000/api/FoodTrucks/postData 
   b) Delete an entry : http://localhost:3000/api/FoodTrucks/deleteOneEntry
5) Auto Expiry of licenses : Automatically Status of expired licenses would change to 'Expired' at 00:00:01 AM in morning. Scheduler has been implemented with node-schedule module of node.js. Which will automatically execute a scheduled job at 1st second of everyday and will change the status.
6) Predicting best truck : http://localhost:3000/api/FoodTrucks/bestTruck?lat=SOMELATITUDE&lng=SOMELONGITUDE  To predict best truck at a location, two input latitude and longitude are provided. It will give the nearest truck from SOMELATITUDE and SOMELONGITUDE.

RUNNING THE TEST USING POSTMAN : 
1) Search by name of applicant : Choose verb get, link = http://localhost:3000/api/FoodTrucks/getByName and provide one input with key 'name' and also provide some value to this key.
2) Search by expiration date : Choose verb get, link = http://localhost:3000/api/FoodTrucks/getByExpirationDate and run. All licenses which are having expiration date less than current date will be the response.
3) Search by Street name : Choose verb get, link = http://localhost:3000/api/FoodTrucks/findByLocation and provide two inputs with key 'lat' and 'lng' and with valid values of latitude and longitude.
4) a) Add new Entry : Choose verb post, link = http://localhost:3000/api/FoodTrucks/postData and provide one input with key 'data' and value for that key should be a json object or multiple json objects in the form of array. All data I've already converted into json form which are in file common/models/data.txt, for testing purpose data can be copied from there.
   b) Delete an Entry : Choose verb Delete, link = http://localhost:3000/api/FoodTrucks/deleteOneEntry, All posted entries contains a unique id so to delete an entry particular id can be provided as an input. Provide a key 'id' with some valid value.
5) Auto Expiry of licenses : As explained above
6) Predicting best truck : Choose verb get, link = http://localhost:3000/api/FoodTrucks/bestTruck and provide two inputs with key 'lat' and 'lng' with valid values. Response would be the best truck(closest to the location provided as input)

There is also an api explorer that can be seen on http://localhost:3000/explorer (from here as well we can test all apis)
