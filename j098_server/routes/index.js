const express = require('express');
const router = express.Router();

const signup = require('./signup')
const login = require('./login')
const sm = require('../session/sessionManager')


router.get('/', async (req, res, next) => {
  res.render('main', { title: 'AirBnB', message: '메인화면'});
});



router.use(signup);
router.use(login);


module.exports = router;
