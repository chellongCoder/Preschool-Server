const BaseModel = require('../base/base_model');
const TABLE = 'tuitions';
class TuitionModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

}
module.exports = TuitionModel;