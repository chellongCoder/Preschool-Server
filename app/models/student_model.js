const BaseModel = require('../base/base_model');
const TABLE = 'students';
class StudentModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    
}
module.exports = StudentModel;