const BaseModel = require('../base/base_model');
const TABLE = 'classes';
class ClassModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = ClassModel;