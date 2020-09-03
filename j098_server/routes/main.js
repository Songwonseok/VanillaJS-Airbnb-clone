const express = require('express');
const router = express.Router();

const db = require('../database/MyDB')
const DAY = 1000*60*60*24;
const auth = require('../middleware/auth')


// 주소, 체크인, 체크아웃, 인원
// address, check_in, check_out, personnel
router.post('/search',async (req, res, next) => {
    const { address, check_in, check_out, personnel} = req.body;

    //1. 검색 주소와 인원에 맞는 숙소를 먼저 검색
    const rooms = await db.find('rooms',['address','capacity'],['like','>='],[address,personnel]);

    //2. 검색된 숙소중에서 해당 기간에 예약이 있는지 확인
    const reserved = await db.find('reserved');

    const checkIn = new Date(check_in).getTime();
    const checkOut = new Date(check_out).getTime();

    const searchResult = [];
    rooms.forEach(room => {
        const booking = reserved.filter(reservation => reservation.room_id == room.id);
        for(let i=0;i<booking.length;i++){
            const bookingCheckIn = new Date(booking[i].check_in).getTime();
            const bookingCheckOut = new Date(booking[i].check_out).getTime();

            // 검색한 체크인, 체크아웃 기간에 이미 예약이 있다면 return
            if (checkIn <= bookingCheckIn && bookingCheckIn < checkOut){
                return;
            } else if (checkIn < bookingCheckOut && bookingCheckOut <= checkOut){
                return;
            }
        }
        searchResult.push(room);
    })
    
    res.send(searchResult);
})


// 아직 테스트용
router.post('/reserve', auth,async (req, res, next) => {
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


function availableReserve(){

}

module.exports = router;