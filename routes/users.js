var express = require('express');
var router = express.Router();
const authented = require('../models/authenicator')
const products_display = require('../models/products_display');
const register = require('../models/register');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {title: 'Login Page'});
});

router.get('/register', async function(req, res, next) {
    res.render('register', {title: 'Register Page'})

;
});

router.post('/register', async function(req, res, next) {
  const uname = req.body.username;
  const passwd = req.body.password; 
  const role = req.body.role;
  console.log(req.body)
  let auth = await register(uname, passwd, parseInt(role));
  if (auth) {
    res.render('login', {title: 'Login Page'});
  } else {
    res.render('register', {title: 'Register Page'})
  }
})

router.post('/', async function(req, res, next) {
  let uname = req.body.username;
  let passwd = req.body.password; 
  let auth = await authented(uname, passwd);
  req.session.username = uname;
  if (auth) {
    html_table = await products_display(req.session.username);
    res.render('users', {title: 'User Page', products_table: html_table});
  } else {
    res.render('login', {title: 'Login Page'});
  }
})

router.post('/logout', async function(req, res, next) {
  req.session.username = null;
  res.redirect('/');
})
module.exports = router;