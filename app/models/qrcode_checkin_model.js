const BaseModel = require('../base/base_model');
const TABLE = 'qrcode_checkins';
class QRCodeModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    
}
module.exports = QRCodeModel;