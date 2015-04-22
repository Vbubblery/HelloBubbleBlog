var express = require('express');
var router = express.Router();
var filter = require('../bin/filter');
var admin={
username:'Bubble',
password:'admin'
}
router.use(function(req, res, next){
res.locals.user = req.session.user;
var err = req.session.error;
delete req.session.error;
res.locals.message = '';
if (err) res.locals.message = '<div class="alert alert-danger">' + err + '</div>';
next();
});
/* GET users page. */
router.get('/', function(req, res, next) {
  res.send("Hello");
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Bubble Login' });
});
router.get('/home', filter.authorize ,function(req, res, next) {
  res.render('home', { title: 'Bubble home' , admin:admin});
});
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});
router.post('/login', function(req, res, next) {
  if(req.body.password == admin.password && req.body.username == admin.username)
  {
    req.session.user = "bubble";
  	res.redirect('home');
  }
  else
  {
    req.session.error='Login failed, please check username and password again!';
  	res.redirect('login');
  }
});
module.exports = router;
