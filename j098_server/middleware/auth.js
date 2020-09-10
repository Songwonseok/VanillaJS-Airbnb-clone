const sm = require('../session/sessionManager')
const db = require('../database/MyDB')



let auth = async (req, res, next) => {
    // 인증하는 곳
    // sid가 있는지 확인
    // 있다면 해당하는 user가 존재하는지 확인
    
    const sid = req.cookies.sid;
    if (!sid || !sm.hashTable.has(sid)){
        res.send('<script type="text/javascript"> alert("로그인 해주세요"); history.back();</script>');
    }
    else {
        const session = sm.get(sid);
        const user = await db.findOne('users', session.storage.id);

        if (!user){
            res.send('<script type="text/javascript"> alert("로그인 해주세요"); history.back();</script>')
        }
    }
    next();    
}

module.exports = auth