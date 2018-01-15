var express = require('express');
var router = express.Router();
//console.log("Inside home.js");
var codeModel = require('../models/codeModel');
var userService = require('../models/userCoreServices');

router.all('/', function(req, res, next) { res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers", "X-Requested-With"); next(); });

router.get('/', function(req, res) {
	console.log('start in home.');
	res.send("Ok to start");
});
/*
router.get('/getItemList', function(req, res) {
	//console.log("here");
	var userId = req.query.userId;
	var userToken= req.query.userToken;

	userService.getUserFromToken(userId,userToken,function(err,user){
		if(err){
			console.log("getUserFromToken err");
			console.log(err);
			res.json(err);
		}else{
			pointModel.getItemList(userId,function(err,data){
				if(err){
					console.log("getItemList err");
					res.json(err);
				}else{
					res.json(data);
				}
			});	
		}
	});		
});
*/
/*
function checkAvailablePoint(userId,cb) {
	pointModel.getTotalMatchPlayed(userId,function(tErr,tData){
		if(tErr){
			cb(tErr);
		}else{
			pointModel.getUserPoint(userId,function(pErr,pData){
				if(pErr){
					console.log(tData);
					cb(pErr);
				}else{
					var totalPoint = tData;
					var currentPoint = pData;
					// console.log(tData);
					// console.log(pData);
					var availablePoint = totalPoint - currentPoint;
					cb(null,availablePoint);
				}
			});	
		}
	});	
}
*/
router.get('/getAllData', function(req, res) {
	//console.log(req.body);
	// var userId = req.query.userId;
	// var userToken = req.query.userToken;
	//var code = req.body.code;
	// var userToken= req.body.userToken;
	// var userId=req.body.userId;
	//console.log(code);
	codeModel.getAllData(function(aErr,aData){
		//console.log("home 57 "+data);
		if(aErr){
			//res.json(aErr);
			res.json(aErr);
		}else{
			//console.log(aData);
			res.json(aData);
		}
	});
});

router.get('/getData', function(req, res) {
	console.log(req.query);
	var key = req.query.key;
	var interval = req.query.interval;
	codeModel.getData(key,interval,function(aErr,aData){
		if(aErr) res.json(aErr);
		else res.json(aData);
	});
});

// router.get('/getDataByDate', function(req, res) {
// 	console.log(req.query);
// 	var key = req.query.key;
// 	codeModel.getDataByDate(key,function(aErr,aData){
// 		//console.log("home 57 "+data);
// 		if(aErr){
// 			//res.json(aErr);
// 			res.json(aErr);
// 		}else{
// 			//console.log(aData);
// 			res.json(aData);
// 		}
// 	});
// });
/*
router.get('/getRewardByPoint', function(req, res) {

	var userId = req.query.userId;
	var userToken= req.query.userToken;
	var rewardId = req.query.rewardId;
	var reason = "r"+rewardId;
	var desc = "match reward promo";
	var pointAdj,shanCredit;

	if (rewardId == 1) {
		pointAdj = -100 ;
		shanCredit = 50000;
	}else if (rewardId == 2) {
		pointAdj = -250 ;
		shanCredit = 200000;
	}else if (rewardId == 3) {
		pointAdj = -500 ;
		shanCredit = 500000;
	}else if (rewardId == 4) {
		pointAdj = -1000 ;
		shanCredit = 1500000;
	}
	userService.getUserFromToken(userId,userToken,function(err,user){
		if(err){
			cancelAnimationFrame
			res.json(err);
		}else{
			console.log(user.level);
			if (user.level >= 3) {
				checkAvailablePoint(userId,function(aErr,availablePoint){
					//console.log("home 57 "+data);
					if(aErr){
						//res.json(aErr);
						res.json({status: 500, description: "getRewardByPoint fail",data:aErr});
					}else{
						if (availablePoint + pointAdj >= 0) {
							pointModel.adjustPoint(userId,pointAdj,reason,function(err,tdata){
								//console.log("home 57 "+data);
								if(err){
									console.log('strInsertPointLog');
									res.json(err);
								}else{
									if(tdata.status == 200){
										userService.giveCredit(userId, userToken, shanCredit, desc,function(cErr,data){
											if(cErr){
												console.log(cErr);
												res.json({status: 500, description: "cannot give credit"});
											}else{
												res.json({status: 200, description: "Gave credit Successfully"});
											}
										});	
									}else{
										res.json(tdata);
									}
								}
							});
						}else{
							res.json({status: 502, description: "you don't have enough point to get rewarded"});
						}
					}
				});	
			}else{
				res.json({status: 502, description: "your game level be at least 3 to get rewarded"});
			}
		}
	});	

});
*/
module.exports = router;