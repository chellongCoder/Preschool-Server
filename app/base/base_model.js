const DBConnector = require('../utils/dbconnect');
class BaseModel {
    constructor(tableName, version) {
        this.tableName = tableName;
        this.db = version ? DBConnector.getInstance(version) : DBConnector.getInstance(1);
    }
    get(id) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where({id}).select('*')
            .then( res => resolve(res[0]))
            .catch( err => reject(err));
        })
    }
    getBy(condition) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where(condition).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    getAll() {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    add(data) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).returning('id').insert(data)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    update(data) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where({id: data.id}).update(data)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    updateBy(data, condition) {
        console.log('====================================');
        console.log(data, condition);
        console.log('====================================');
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where(condition).update(data)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    del(id) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).where({id: id}).del()
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    count() {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).count('id')
            .then( res => resolve(res[0]['count(`id`)']))
            .catch( err => reject(err));
        })
    }
    countBy(condition) {
        return new Promise( (resolve, reject) => {
            this.db(this.tableName).count('id').where(condition)
            .then( res => resolve(res[0]['count(`id`)']))
            .catch( err => reject(err));
        })
    }
}
module.exports = BaseModel