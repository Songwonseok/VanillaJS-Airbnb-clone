let sessionCheck = async (req, res, next) => {
    const sid = req.cookies.sid;
    if (sid && req.sm.hashTable.has(sid)){
        req.user = req.sm.get(sid).storage.id; // get하면 자동으로 갱신됨
    }
    next();    
}

module.exports = sessionCheck