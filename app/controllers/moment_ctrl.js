const { RESPONSE_STATUS, Response, Controller } = require('../base');
const MomentModel = require('../models/moment_model');
const db = require('./../../modelsORM');

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
            const rs = await momentModel.getMomentById(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("e", e);
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
        console.log("asdasd")
        try {
            console.log("param", req.params)
            const momentModel = new MomentModel();
            const rs = await momentModel.update({...req.body, id: req.params.id})
            console.log('result', rs);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            // console.log("er", e);
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