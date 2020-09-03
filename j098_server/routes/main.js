const express = require('express');
const router = express.Router();

const db = require('../database/MyDB')
const DAY = 1000*60*60*24;


router.post('/search', async (req, res, next) => {
    res.render('signup');
})


// 아직 테스트용
router.post('/reserve', async (req, res, next) => {
    //비밀번호를 암호화 시킴
    const room = await db.findOne('rooms',req.body.room_id);
    const checkIn = new Date(req.body.check_in);
    const checkOut = new Date(req.body.check_out);

    // getDay() [일월화수목금토] = [0123456] 금토 주말
    const night = (checkOut.getTime() - checkIn.getTime()) / DAY;

    let start = checkIn.getDay(); // 요일
    let price = 0;
    for(let i=0;i<night;i++){
        const day = (start+i)%7;
        if (day >= 5) price += room.weekend_price;
        else price += room.weekday_price;
    }

    req.body.price = price;

    await db.insert('reserved',req.body)
    const reserves = await db.find('reserved');
    res.send(reserves);

})

module.exports = router;