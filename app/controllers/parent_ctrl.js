const { RESPONSE_STATUS, Response, Controller } = require('../base');
const ParentModel = require('../models/parent_model');

class ParentController extends Controller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const parentModel = new ParentModel();
            const rs = await parentModel.getAll();
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async getId(req, res) {
        try {
            const parentModel = new ParentModel();
            const rs = await parentModel.get(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async add(req, res) {
        try {
            const parentModel = new ParentModel();
            const rs = await parentModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_1STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const parentModel = new ParentModel();
            console.log("request body", req.body, req.params);
            const rs = await parentModel.update({...req.body, id: req.params})
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async remove(req, res) {
        try {
            const parentModel = new ParentModel();
            const rs = await parentModel.del(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = ParentController;