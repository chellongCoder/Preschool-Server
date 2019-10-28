const BaseModel = require('../base/base_model');
const TABLE = 'study_result';
class StudyResultModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

}
module.exports = StudyResultModel;