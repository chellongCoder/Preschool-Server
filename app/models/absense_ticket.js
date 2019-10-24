const BaseModel = require('../base/base_model');
const TABLE = 'absense_tickets';
class AbsenseModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = AbsenseModel;