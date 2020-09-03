const express = require('express');
const router = express.Router();

const signup = require('./signup')
const login = require('./login')
const main = require('./main')

const sm = require('../session/sessionManager')
const db = require('../database/MyDB')

router.get('/', async (req, res, next) => {
  const data = await db.find('rooms', ['address'], ['like'], ['서울']);
  let title = '';
  let message = '';

  if (data.length > 0) {
    title = data[0].id;
    message = data[0].name;
  }
  res.send(data);
  // res.render('main', { title: title, message: message });
  
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
