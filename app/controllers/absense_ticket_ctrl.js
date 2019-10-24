const { RESPONSE_STATUS, Response, Controller } = require('../base');
const AbsenseModel = require('../models/absense_ticket');

class AbsenseController extends Controller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const absenseModel = new AbsenseModel();
            const rs = await absenseModel.getAll();
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async getId(req, res) {
        try {
            const absenseModel = new AbsenseModel();
            const rs = await absenseModel.get(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async add(req, res) {
        try {
            const absenseModel = new AbsenseModel();
            const rs = await absenseModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const absenseModel = new AbsenseModel();
            const rs = await absenseModel.update(req.body)
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async remove(req, res) {
        try {
            const absenseModel = new AbsenseModel();
            const rs = await absenseModel.del(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = AbsenseController;