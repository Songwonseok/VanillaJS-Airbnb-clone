const [MINUTE ,HOUR, DAY] = [60000, 3600000, 864000000]
const AccessTime = 2 * HOUR;

class Session {
    constructor(){
        this.createTime = new Date();
        this.expirationTime = new Date(this.createTime.getTime() + AccessTime);
        this.storage = {};
    }
    set(key,value) {
        this.storage[key] = value;
    }

    renewTime(){
        if (this.remainingTime <= (AccessTime/2)){
            this.expirationTime = new Date(this.expirationTime.getTime() + (AccessTime/2));
        }
    }

    get remainingTime(){
        const now = new Date();
        return this.expirationTime.getTime() - now.getTime();
    }
}

module.exports = Session;