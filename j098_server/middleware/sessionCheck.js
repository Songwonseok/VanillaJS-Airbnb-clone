const sm = require('../session/sessionManager')

let sessionCheck = async (req, res, next) => {
    const sid = req.cookies.sid;
    if (sid && sm.hashTable.has(sid)){
        req.user = sm.get(sid).storage.id; // get하면 자동으로 갱신됨
    }
    next();    
}

module.exports = sessionCheck