const { RESPONSE_STATUS, Response, Controller } = require('../base');
const QRCodeCheckinModel = require('../models/qrcode_checkin_model');
const db = require('./../../modelsORM');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
class QRCodeCheckinController extends Controller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const qrCodeCheckinModel = new QRCodeCheckinModel();
            const rs = await qrCodeCheckinModel.getAll();
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async getId(req, res) {
        try {
            const qrCodeCheckinModel = new QRCodeCheckinModel();
            const rs = await qrCodeCheckinModel.get(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async add(req, res) {
        console.log("req", req.body)
        const query = {
            where:{
                [Op.and]: [
                    {
                        updatedAt: {
                            [Op.lt]: new Date().setHours(31,0,0,0),
                            [Op.gt]: new Date().setHours(7,0,0,0)
                        }
                    },
                    {
                        studentID: req.body.studentID
                    }
                ] 
            },
        }

        try {
            const checkin = await db['qrcode_checkin'].findAll(query);
            if(checkin.length > 0) {
                res.json(new Response(RESPONSE_STATUS.SUCCESS, checkin))
                return;
            }
            const qrCodeCheckinModel = new QRCodeCheckinModel();
            const rs = await qrCodeCheckinModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log('e', e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const qrCodeCheckinModel = new QRCodeCheckinModel();
            const rs = await qrCodeCheckinModel.update({...req.body, id: req.params.id})
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async remove(req, res) {
        try {
            const qrCodeCheckinModel = new QRCodeCheckinModel();
            const rs = await qrCodeCheckinModel.del(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = QRCodeCheckinController;