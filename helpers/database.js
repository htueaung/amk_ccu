// Local
// var mysql = require('mysql');
// var pool  = mysql.createPool({
// 	connectionLimit : 50,
// 	host: '128.199.234.228',
// 	user: 'shan_mgmt_user',
// 	password : 'MGnBJSOx7fb305195MGnBJSOx7fb305195MGnBJSOx7fb305195',
// 	port : 3306,
// 	database:'shan_promo_db',
// 	dateStrings: 'date',
// 	multipleStatements:true
// });

// var getConnection = function(callback) {
//     pool.getConnection(function(err, connection) {
// 		console.log(err);
//         callback(err, connection);
//     });
// };
// exports.getConnection = getConnection;

// Live
var mysql = require('mysql');
var pool  = mysql.createPool({
	connectionLimit : 100,
	host: '127.0.0.1',
	user: 'root',
	password : '',
	port : 3306,
	database:'intern',
	dateStrings: 'date',
	multipleStatements:true
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
};

exports.getConnection = getConnection;

