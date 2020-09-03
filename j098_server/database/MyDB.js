const fs = require('fs');
const fsPromise = fs.promises;

class MyDB {
    constructor() {
        this.path =`${__dirname}/tables/`;
        this.tables = ['users']
        // DB 잘 연동되는지 확인
        this.tables.forEach( t => {
            fs.readFile(`${this.path+t}.json`, (err,data) =>{
                if(err) {
                    console.error('DB 연동 실패');
                    process.exit();
                }
            })
        })
    }

    async find(table, column = null, operator = null, value = null) {
        try{
            let data = await fsPromise.readFile(`${this.path + table}.json`);
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
            console.lerrorog(err);
        }
    }

    async findOne(table, pk) {
        try {
            let data = await fsPromise.readFile(`${this.path+ table}.json`);
            data = JSON.parse(data).data;
            const PK = data.PK;
            data = data.find(e => e[PK] == pk)

            if(data) return data;
            return null;
        } catch (err) {
            console.error(err);
        }

    }

    async insert(table, params) {
        const path = `${this.path + table}.json`;
        let result = false;


        fs.readFile(path, 'utf8', async (err, data) => {
            if (err) {
                return console.error(err);
            }

            const postDB = JSON.parse(data);
            const PK = postDB.PK;

            // autoIncrement가 0이 아니면
            if (!postDB.auto_increment){
                params[PK] = postDB.auto_increment++;
            }

            // Primary Key가 중복되는지 확인
            if (!postDB.data.find(e => e[PK] == params[PK])) {
                postDB.data.push(params);
                const updateData = JSON.stringify(postDB, null, 4);
                await fsPromise.writeFile(path, updateData, 'utf8', (err, file) => {
                    if (err) {
                        return console.error('Post 실패');
                    }
                    result = true;
                });
            } else {
                console.error("Post 실패 : 이미 존재하는 ID");
            }
        });
        return result
    }

    async delete(table, pk) {
        const path = `${this.path + table}.json`;
        let result = false;

        fs.readFile(path, 'utf8', async (err, data) => {
            if (err) {
                return console.error(err);
            }
            const postDB = JSON.parse(data);
            const PK = postDB.PK;

            // Primary Key가 존재하는지 확인
            const index = postDB.data.findIndex(obj => obj[PK] == pk)

            // 존재 한다면 해당 인덱스 삭제          
            if (index != -1) {
                postDB.data.splice(index, 1);
                const updateData = JSON.stringify(postDB, null, 4);
                await fsPromise.writeFile(path, updateData, 'utf8', (err, file) => {
                    if (err) {
                        return console.error('Delete 실패');
                    }
                    result = true;
                });
            } else {
                console.error("Delete 실패 : 존재하지 않는 ID");
            }
        });
        return result
    }
}

const myDB = new MyDB();

module.exports = myDB;