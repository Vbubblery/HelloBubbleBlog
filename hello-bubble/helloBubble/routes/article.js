var express = require('express');
var router = express.Router();
var mongoose = require('../mongoose.js');
var Schema = mongoose.Schema;
var BlogPost = new Schema({
 title:String,
 time:Number,
 author:String,
 category:String,
 content:String,
 tag: Array,
 pageviews:Number,
 lastmodify:Number,
 lastmodifyname:String,
 access :String
});

/* GET home page. */
router.get('/all', function(req, res, next) {
	var MyModel = mongoose.model('essay', BlogPost,"essay");
	MyModel.find(function(err, docs){
		/**array.sort(function(a, b) {
      		return a.num - b.num
		});**/
		res.render('allarticles', { title: 'All' , articles: docs});
	});
  
});
router.get('/essay/:id', function(req, res, next) {
	var MyModel = mongoose.model('essay', BlogPost,"essay");
	var id = req.params.id;
	var pager= "";
	MyModel.findById(id,function(err,obj){
		obj.pageviews+=1;
		obj.save();
		MyModel.findOne({_id:{$lt:id}},null,{sort:{_id:-1}},function (err, lastobj) {
			MyModel.findOne({_id:{$gt:id}},null,{sort:{_id:1}},function (err, nextobj) {
				console.log(lastobj+" "+nextobj);
				res.render('article', { title: obj.title ,article: obj, lart:lastobj, nart:nextobj });
			});
		});
	});
});
// router.get('/essay2/123', function(req, res, next) {
// var MyModel = mongoose.model('essay', BlogPost,"essay");
// MyModel.findOne({_id:"551fe19abd45724f1113d012"},function (err, doc) {
//   doc.title = 'jason borne';
//   doc.save();
// });
// });
module.exports = router;