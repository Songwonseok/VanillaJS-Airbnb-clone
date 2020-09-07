const fs = require('fs');
const fsPromise = fs.promises;

class MyDB {
    constructor() {
        this.path =`${__dirname}/tables/`;
        this.tables = ['users', 'reserved', 'rooms']
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

    async find(table, columns=[], operators=[], values=[]) {
        try{
            let data = await fsPromise.readFile(`${this.path + table}.json`);
            data = JSON.parse(data).rows;
            // 컬럼, 연산자, 값 갯수가 같을 때
            if(columns.length == operators.length && operators.length == values.length){
                for(let i=0;i<columns.length;i++){
                    if (operators[i] == '=') data = data.filter(u => u[columns[i]] == values[i])
                    else if (operators[i] == '<') data = data.filter(u => u[columns[i]] < values[i])
                    else if (operators[i] == '<=') data = data.filter(u => u[columns[i]] <= values[i])
                    else if (operators[i] == '>') data = data.filter(u => u[columns[i]] > values[i])
                    else if (operators[i] == '>=') data = data.filter(u => u[columns[i]] >= values[i])
                    else if (operators[i] == '!=') data = data.filter(u => u[columns[i]] != values[i])
                    else if (operators[i] == 'like') data = data.filter(u => u[columns[i]].indexOf(values[i]) != -1)
                }
            }else{
                throw new Error('파라미터가 잘못 되었습니다.')
            }
            return data
        }catch(err){
            console.lerrorog(err);
        }
    }

    async findOne(table, pk) {
        try {
            let data = await fsPromise.readFile(`${this.path+ table}.json`);
            data = JSON.parse(data);

            const PK = data.PK;
            data = data.rows.find(e => e[PK] == pk)

            if(data) return data;
            return null;
        } catch (err) {
            console.error(err);
        }

    }

    async insert(table, params) {
        const path = `${this.path + table}.json`;
        const data = await fsPromise.readFile(path);
        const targetDB = JSON.parse(data);
        const PK = targetDB.PK;
        
        // autoIncrement가 0이 아니면
        if (targetDB.auto_increment>0) {
            params[PK] = targetDB.auto_increment++;
        }

        // Primary Key가 중복되는지 확인
        if (!targetDB.rows.find(e => e[PK] == params[PK])) {
            targetDB.rows.push(params);
            const updateData = JSON.stringify(targetDB, null, 4);
            await fsPromise.writeFile(path, updateData, 'utf8');
        } else {
            throw new Error("Post 실패 : 이미 존재하는 ID");
        }
    }

    async delete(table, pk) {
        const path = `${this.path + table}.json`;
        const data = await fsPromise.readFile(path);
        const targetDB = JSON.parse(data);
        const PK = targetDB.PK;

        // Primary Key가 존재하는지 확인
        const index = targetDB.rows.findIndex(obj => obj[PK] == pk);

        // 존재 한다면 해당 인덱스 삭제  
        if (index != -1) {
            targetDB.rows.splice(index, 1);
            const updateData = JSON.stringify(targetDB, null, 4);
            await fsPromise.writeFile(path, updateData, 'utf8')
        } else {
            throw new Error("Delete 실패 : 존재하지 않는 ID");
        }
    }
}

const myDB = new MyDB();

module.exports = myDB;