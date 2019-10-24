const BaseModel = require('../base/base_model');
const TABLE = 'meal_types';
class MealTypeModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = MealTypeModel;