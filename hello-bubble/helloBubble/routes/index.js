var express = require('express');
var router = express.Router();

//var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mydb'); //注:nodetest1为数据库名

/* GET home page. */
router.get('/', function(req, res, next) {
	var collection = db.get('me');
	collection.find({},{},function(e,obj){
		res.render('index', { title: 'Bubble House' });
	});
  
});
router.get('/about_me', function(req, res, next) {
  var collection = db.get('me');
	collection.find({},{},function(e,obj){
		res.render('me', { title: 'About Me' ,me: obj[0] });
	});
});
module.exports = router;