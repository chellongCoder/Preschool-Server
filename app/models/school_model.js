const BaseModel = require('../base/base_model');
const TABLE = 'schools';
class SchoolModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    
}
module.exports = SchoolModel;