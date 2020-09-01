var express = require('express');
var router = express.Router();

const users = require('./users')
const login = require('./login')
const MyDB = require('../database/MyDB')

const db = new MyDB();
/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = await db.get('users','id','=','admin');
  res.render('main', { title: 'Express', id:user.id });
});

router.use('/users', users);
router.use('/login', login);

module.exports = router;
