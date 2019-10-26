const BaseModel = require('../base/base_model');
const TABLE = 'activities';
class ActivityModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = ActivityModel;