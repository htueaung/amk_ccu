var db = require('../helpers/database');
var userService = require('../models/userCoreServices');


function getAllData(cb) {
	//var str = "SELECT point FROM shan_point WHERE user_id=? ";
	var str ="SELECT * FROM hourly_ccu WHERE 1=1 ";//AND status = 2
	db.getConnection(function(err, connection){
		connection.query(str, function(err, result){
			connection.release();
			if(!err){	
				if(result && result.length > 0){
					console.log("success sql exe");
					cb(null, {status: 200, description: "getAllData success",data:result});
				}else{
					console.log(err);
					cb(null,{status: 500, description: "getAllData fail"});
				}
			}else{
				cb(err);
			}
		});
	});
}

function getData(key,interval,cb) {
	//var str = "SELECT point FROM shan_point WHERE user_id=? ";
	if(!interval)
		var str ="SELECT * FROM hourly_ccu WHERE `key`='"+key+"'";//AND status = 2
	else var str ="SELECT SUM(count) as count,CAST(ccu_date AS DATE) as ccu_date FROM hourly_ccu WHERE `key`='"+key+"' GROUP BY CAST(ccu_date AS DATE)"
	db.getConnection(function(err, connection){
		connection.query(str, function(err, result){
			connection.release();
			if(!err){	
				if(result && result.length > 0){
					console.log("success sql exe");
					cb(null, {status: 200, description: "getAllData success",data:result});
				}else{
					console.log(err);
					cb(null,{status: 500, description: "getAllData fail"});
				}
			}else{
				cb(err);
			}
		});
	});
}

function getDataByDate(key,cb) {
	//var str = "SELECT point FROM shan_point WHERE user_id=? ";
	var str ="SELECT SUM(count),CAST(ccu_date AS DATE) FROM hourly_ccu WHERE `key`='"+key+"' GROUP BY CAST(ccu_date AS DATE)";//AND status = 2
	db.getConnection(function(err, connection){
		connection.query(str, function(err, result){
			connection.release();
			if(!err){	
				if(result && result.length > 0){
					console.log("success sql exe");
					cb(null, {status: 200, description: "getAllData success",data:result});
				}else{
					console.log(err);
					cb(null,{status: 500, description: "getAllData fail"});
				}
			}else{
				cb(err);
			}
		});
	});
}
//module.exports.getTotalMatchPlayed= getTotalMatchPlayed ;
exports.getAllData= getAllData ;
exports.getData = getData;
exports.getDataByDate = getDataByDate;
//module.exports.getUserPoint= getUserPoint ;
