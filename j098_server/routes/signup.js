const express = require('express');
const router = express.Router();

const db = require('../database/MyDB')

const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼


router.get('/signup', async (req, res, next) => {
  res.render('signup');
})

router.post('/signup', async (req,res,next) => {
  //비밀번호를 암호화 시킴
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (err) return next(err)
      req.body.password = hash
      
      const result = await db.postUser(req.body)
      if (result) res.redirect('/');
      else res.send('<script type="text/javascript"> alert("이미 가입된 회원입니다."); window.location.href = "/signup"</script>')
    });
  });
})

module.exports = router;
