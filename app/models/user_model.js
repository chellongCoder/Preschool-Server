const BaseModel = require('../base/base_model');
const Hash = require('../utils/hash');
const TABLE = 'user';
class UserModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    async auth(username, password) {
        return new Promise( async (resolve, reject) => {
            const users = await this.getBy({'username': username});
            if (users && users.length > 0) {
                const rs = await Hash.compare(password, users[0]['password']);
                if (rs) resolve(users);
                else reject('username or password is not correct');
            } else {
                reject('username not found');
            }    
        })
    }
}
module.exports = UserModel