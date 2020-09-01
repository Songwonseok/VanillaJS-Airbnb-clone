const MyDB = require('../database/MyDB')
const express = require('express');

const router = express.Router();
const db = new MyDB();


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/signup', async (req, res, next) => {
  res.render('signup');
})

router.post('/signup', async (req,res,next) => {
  await db.postUser(req)
  res.redirect('/')
})

module.exports = router;
