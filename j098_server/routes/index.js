const express = require('express');
const router = express.Router();

const signup = require('./signup')
const login = require('./login')
const main = require('./main')

const sm = require('../session/sessionManager')
const db = require('../database/MyDB')

router.get('/', async (req, res, next) => {
 
  res.render('main', { title: title, message: message });
  
});

router.post('/', async (req, res, next) => {

  db.insert('rooms', req.body);
  const list = await db.find('rooms')
  res.send(req.body);
});

router.use(signup);
router.use(login);
router.use(main);


module.exports = router;
