const BaseModel = require('../base/base_model');
const TABLE = 'moment';
class MomentModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = MomentModel