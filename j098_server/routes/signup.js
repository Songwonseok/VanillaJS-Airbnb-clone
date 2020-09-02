const express = require('express');
const router = express.Router();

const MyDB = require('../database/MyDB')
const db = new MyDB();

const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼


router.get('/signup', async (req, res, next) => {
  res.render('signup');
})

router.post('/signup', async (req,res,next) => {
  console.log('들어옴');
  //비밀번호를 암호화 시킴
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (err) return next(err)
      req.body.password = hash
      
      await db.postUser(req.body)
      res.redirect('/')
    });
  });
})

module.exports = router;
