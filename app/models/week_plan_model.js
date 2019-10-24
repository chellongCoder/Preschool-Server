const BaseModel = require('../base/base_model');
const TABLE = 'week_plan';
class WeekPlanModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    
}
module.exports = WeekPlanModel;