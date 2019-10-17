const BaseModel = require('../base/base_model');
const TABLE = 'teachers';
class TeacherModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    
}
module.exports = TeacherModel;