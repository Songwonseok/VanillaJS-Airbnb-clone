const sm = require('../session/sessionManager')
const db = require('../database/MyDB')



let auth = async (req, res, next) => {
    // 인증하는 곳
    // sid가 있는지 확인
    // 있다면 해당하는 user가 존재하는지 확인
    const sid = req.cookies.sid;
    console.log('sid: ' + sid);
    console.log(sm.hashTable.has(sid));
    if (!sid || !sm.hashTable.has(sid))
        res.send('<script type="text/javascript"> alert("로그인해주세요"); window.location.href = "/login"</script>')
    else {
        const session = sm.get(sid);
        const user = await db.findOne('users', 'id', session.storage.id);
        console.log(user);
        if (!user)
            res.send('<script type="text/javascript"> alert("로그인해주세요"); window.location.href = "/login"</script>')
    }
    next();    
}

module.exports = auth