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

function getData(req,cb) {
	//var str = "SELECT point FROM shan_point WHERE user_id=? ";
	console.log(req)
	var qry = "";
	if(req.interval=="hourly") qry = "SELECT * FROM `hourly_ccu` WHERE `key`='"+req.customer_level+"' && CAST(ccu_date AS DATE) BETWEEN '"+req.start_date+"' AND '"+req.end_date+"'";
	if(req.interval=="daily") qry ="SELECT SUM(count) as count,CAST(ccu_date AS DATE) as ccu_date FROM hourly_ccu WHERE `key`='"+req.customer_level+"' && CAST(ccu_date AS DATE) BETWEEN '"+req.start_date+"' AND '"+req.end_date+"' GROUP BY CAST(ccu_date AS DATE)";
	if(req.year) qry ="SELECT YEAR(ccu_date),MONTH(ccu_date),SUM(COUNT) AS Total_count FROM `hourly_ccu` WHERE YEAR(ccu_date)='"+ req.year+"' GROUP BY YEAR(ccu_date),MONTH(ccu_date) ORDER BY YEAR(ccu_date),MONTH(ccu_date) DESC"
	db.getConnection(function(err, connection){
		connection.query(qry, function(err, result){
			connection.release();
			if(!err){	
				if(result && result.length > 0){
					console.log("success sql exe");
					cb(null, {status: 200, description: "getAllData success",data:result, yearly : true});
				}else{
					console.error(err+"asdf");
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
					console.log(result);
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
