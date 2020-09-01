const express = require('express');
const router = express.Router();

const users = require('./users')
const auth = require('./auth')

router.get('/', async (req, res, next) => {
  res.render('main', { title: 'AirBnB', message: '메인화면'});
});



router.use('/users', users);
router.use('/auth', auth);


module.exports = router;
