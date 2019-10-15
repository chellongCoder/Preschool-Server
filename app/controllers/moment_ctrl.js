const { RESPONSE_STATUS, Response, Controller } = require('../base');
const MomentModel = require('../models/moment_model');

class MomentController extends Controller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const momentModel = new MomentModel();
            const rs = await momentModel.getAll();
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async getId(req, res) {
        try {
            const momentModel = new MomentModel();
            const rs = await momentModel.get(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async add(req, res) {
        try {
            const momentModel = new MomentModel();
            const rs = await momentModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const momentModel = new MomentModel();
            const rs = await momentModel.update(req.body)
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async remove(req, res) {
        try {
            const momentModel = new MomentModel();
            const rs = await momentModel.del(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = MomentController;