const BaseModel = require('../base/base_model');
const TABLE = 'images';
class ImageModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }
}
module.exports = ImageModel;