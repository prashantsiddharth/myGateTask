'use strict';

module.exports = function(Foodtruck) {

	//For api getByName
	Foodtruck.getByName = function(name,cb){
		var query = {
			where : {
				Applicant: name
			}
		}
		Foodtruck.find(query,function(err,response){
			if(err){
				cb(err);
			}
			cb(null,response);
		});
		
	}
	Foodtruck.remoteMethod('getByName',{
		accepts : [{arg: 'name',type:'string'}],
		returns : {arg: 'response',type:'string'},
		http : {path: '/getByName', verb:'get'}
	});


	//For  api postData
	Foodtruck.postData = function(data,cb){
		var loopback = require('loopback');
		var newFoodTruck = JSON.parse(data);
		var flag = true;
		for(var i=0; i<newFoodTruck.length; ++i){
			flag = false;
			newFoodTruck[i].geolocation = new loopback.GeoPoint({lat:newFoodTruck[i].Latitude, lng: newFoodTruck[i].Longitude});
			if(newFoodTruck[i].ExpirationDate.length == 0){
				newFoodTruck[i].ExpirationDate = null;
			}
		}
		if(flag && newFoodTruck.ExpirationDate.length==0) newFoodTruck.ExpirationDate = null;
    if(flag){
			newFoodTruck.geolocation = new loopback.GeoPoint({lat:newFoodTruck.Latitude, lng:newFoodTruck.Longitude});
		}
		Foodtruck.create(newFoodTruck,function(err,response){
			if(err){
				cb(err);
			}
			cb(null,"Data Posted Successfully");
		});
	}
	Foodtruck.remoteMethod('postData',{
		accepts : [{arg: 'data',type:'string'}],
		returns : {arg: 'response',type:'string'},
		http : {path: '/postData', verb:'post'}
	});


	//for api deleteOneEntry
	Foodtruck.deleteOneEntry = function(id,cb){
		Foodtruck.destroyById(id,function(err,response){
			if(err){
				cb(err);
			}
			cb(null,"Entry Deleted Successfully");
		});
	}
	Foodtruck.remoteMethod('deleteOneEntry',{
		accepts : [{arg: 'id',type:'string'}],
		returns : {arg: 'response',type:'string'},
		http : {path: '/deleteOneEntry', verb:'delete'}
	});



	//for api getByExpirationDate
	Foodtruck.getByExpirationDate = function(cb){
		var currentDate = new Date();
		var filter = {
			where : {
				ExpirationDate : {lt : currentDate}
			}
		}
		Foodtruck.find(filter,function(err,response){
			if(err){
				cb(err);
			}
			cb(null,response);
		});
	}
	Foodtruck.remoteMethod('getByExpirationDate',{
		accepts : [],
		returns : {arg: 'response',type:'string'},
		http : {path: '/getByExpirationDate', verb:'get'}
	});


	//api for finding best truck at given location
	Foodtruck.bestTruck = function(lat,lng,cb){
		var loopback = require('loopback');
		var here = new loopback.GeoPoint({lat:lat, lng: lng});
		var filter = {where: {geolocation: {near: here},FacilityType:'Truck'}, limit:1};
		Foodtruck.find(filter,function(err,response){
			if(err){
				cb(err);
			}
			cb(null,response);
		});
	}
	Foodtruck.remoteMethod('bestTruck',{
		accepts : [{arg:'lat',type:'number'},{arg:'lng',type:'number'}],
		returns : {arg: 'response',type:'string'},
		http : {path: '/bestTruck', verb:'get'}
	});


	//api to findByLocation
	Foodtruck.findByLocation = function(lat,lng,cb){
		var loopback = require('loopback');
		var here = new loopback.GeoPoint({lat:lat, lng: lng});
		var filter = {where: {geolocation: here}};
		Foodtruck.find(filter,function(err,response){
			if(err){
				cb(err);
			}
			cb(null,response);
		});
	}
	Foodtruck.remoteMethod('findByLocation',{
		accepts : [{arg:'lat',type:'number'},{arg:'lng',type:'number'}],
		returns : {arg: 'response',type:'string'},
		http : {path: '/findByLocation', verb:'get'}
	});


	//to auto update the status to expired
	Foodtruck.isNotificationInstance = function (cb) {  
		console.log("called");
		var currentDate = Date.now();
		console.log(currentDate);
		var query ={ExpirationDate : {lt: currentDate}};
		var data = {Status:'EXPIRED'};
		Foodtruck.updateAll(query,data,function(err,info){
			if(err); //cb();
			//console.log(info);
			//cb();
		});
	}
};
