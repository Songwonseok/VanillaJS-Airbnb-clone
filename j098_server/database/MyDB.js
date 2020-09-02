const fs = require('fs');
const fsPromise = fs.promises;

class MyDB {
    constructor() {
    }

    async find(table, column = null, operator = null, value = null) {
        try{
            let data = await fsPromise.readFile(`${__dirname}/tables/${table}.json`);
            data = JSON.parse(data).data;
            if (column) {
                if (operator == '=') data = data.filter(u => u[column] == value)
                else if (operator == '<') data = data.filter(u => u[column] < value)
                else if (operator == '<=') data = data.filter(u => u[column] <= value)
                else if (operator == '>') data = data.filter(u => u[column] > value)
                else if (operator == '>=') data = data.filter(u => u[column] >= value)
                else if (operator == '!=') data = data.filter(u => u[column] != value)
                }
            return data
        }catch(err){
            console.log(err);
        }
    }

    async findOne(table, pk, value) {
        try {
            let data = await fsPromise.readFile(`${__dirname}/tables/${table}.json`);
            data = JSON.parse(data).data;
            data = data.find(e => e[pk] == value)

            if(data) return data;
            return null;
        } catch (err) {
            console.log(err);
        }

    }

    async postUser(values) {
        const { id, password, name, phone, email } = values;
        const path = `${__dirname}/tables/users.json`;

        fs.readFile(path, 'utf8', async (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const postDB = JSON.parse(data);

            if (!postDB.data.find(e => e.id == id)) {
                const newPost = {
                    "id": id,
                    "password": password,
                    "name": name,
                    "phone" : phone,
                    "email" : email
                }
                postDB.data.push(newPost);
                const updateData = JSON.stringify(postDB, null, 4);
                await fsPromise.writeFile(path, updateData, 'utf8', (err, file) => {
                    if (err) {
                        console.error('Post 실패');
                    }

                    console.log("Post 성공");
                });
            } else {
                console.log("Post 실패 : 이미 존재하는 ID");
            }

        });
    }


}

const myDB = new MyDB();

module.exports = myDB;