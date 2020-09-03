const Session = require("./session");
const EventEmitter = require('events')

class SessionManager extends EventEmitter{
    constructor(){
        super();
        this.hashTable = new Map();
        this.on('updateSession', ()=>{
            if (this.hashTable.size > 0) {
                const sidList = [...this.hashTable.keys()];
                if (sidList){
                    sidList.forEach(sid => {
                        if (this.hashTable.get(sid).remainingTime < 0)
                            this.hashTable.delete(sid);
                    });
                }
            }
        })
    }
    
    // 해당 sid를 사용할때마다 세션의 시간이 끝났으면 삭제, 30분 이하로 남았으면 갱신
    get(sid){
        const session = this.hashTable.get(sid);
        if(session){
            if (session.remainingTime <0){
                this.destroySession(sid);
                return null;
            }
            else{
                session.renewTime();
                return session;
            }
        }
    }
    set(sid, userId){
        const session = new Session();
        session.set('id', userId);
        this.hashTable.set(sid, session)
    }

    deleteSession(sid){
        return this.hashTable.delete(sid)
    }
}

const sessionManager = new SessionManager();

module.exports = sessionManager;