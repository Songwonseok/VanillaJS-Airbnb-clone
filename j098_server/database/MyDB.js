const fs = require('fs')


class MyDB {
    constructor() {
        this.path = './tables/';
    }



    getUser(column=null) {
        const uesrs = null;
        fs.readFile(this.path+'users.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err)
            }
            else users = JSON.parse(data);
        });
        return users;
    }

    postUser(req) {
        const { id, password, name } = req.body;

        fs.readFile(this.userPath, 'utf8', (err, data) => {
            if (err) {
                new Error(console.log("error"));
                return;
            }

            const postDB = JSON.parse(data);

            if (Object.keys(postDB).indexOf(id) != -1) {
                postDB[id] = {
                    "id": id,
                    "password": password,
                    "name": name
                }
                const users = JSON.stringify(postDB, null, 4);
                fs.writeFile(this.userPath, users, 'utf8', (err, file) => {
                    if (err) {
                        console.error('User Post 실패');
                    }

                    console.log("User Post 성공");
                });
            } else {
                console.log("Post 실패 : 이미 존재하는 ID");
            }

        });
    }


}



module.exports = MyDB;