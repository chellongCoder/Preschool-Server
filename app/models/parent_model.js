const BaseModel = require('../base/base_model');
const TABLE = 'parents';
class ParentModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    
}
module.exports = ParentModel;