const BaseModel = require('../base/base_model');
const TABLE = 'image';
class ImageModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = ImageModel;