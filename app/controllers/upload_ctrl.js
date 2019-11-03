const { RESPONSE_STATUS, Response, Controller } = require('../base');
const UploadModel = require('../models/upload_model');



class UploadController extends Controller {

    async add(req, res) {
        
        try {

            const uploadModel = new UploadModel();
            const rs = await uploadModel.uploadImage(req, res);
            console.log("rs", rs);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log('e', e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = UploadController;