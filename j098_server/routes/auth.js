const MyDB = require('../database/MyDB')
const express = require('express');

const router = express.Router();
const db = new MyDB();

router.get('/login', (req, res, next) => {
    console.log("로그인");
    res.render('login');
});

router.post('/login', async (req, res, next) => {
    const { id, password } = req.body
    const user = await db.findOne('users', id);
    if (!user) {
        console.log('없는 아이디');
        res.redirect('/auth/login');
    } else {
        if (user.password != password) {
            console.log('비밀번호가 틀림');
            res.redirect('/auth/login');
        }
        else {
            console.log('로그인 성공');
            res.redirect('/');
        }
    }
});


router.get('/logout', (req, res, next) => {

})
module.exports = router;
