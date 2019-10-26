const BaseModel = require('../base/base_model');
const TABLE = 'activities';
class NotifyModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = NotifyModel;