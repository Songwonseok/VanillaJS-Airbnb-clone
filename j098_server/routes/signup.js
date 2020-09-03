const express = require('express');
const router = express.Router();

const db = require('../database/MyDB')

const bcrypt = require('bcrypt');
const saltRounds = 10; // 값이 높을 수록 비용 소요가 큼


router.get('/signup', async (req, res, next) => {
  res.render('signup');
})

router.post('/signup', (req,res,next) => {
  //비밀번호를 암호화 시킴
  let result = false;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      if (err) return next(err)
      req.body.password = hash
      try{
        await db.insert('users',req.body)
        res.redirect('/');
      }catch(err){
        console.error(err);
        res.send('<script type="text/javascript"> alert("이미 가입된 회원입니다."); window.location.href = "/signup"</script>')
      }
    });
  });
})

module.exports = router;
