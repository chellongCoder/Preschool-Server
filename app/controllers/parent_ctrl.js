const { RESPONSE_STATUS, Response, Controller } = require('../base');
const ParentModel = require('../models/parent_model');
const db = require('./../../modelsORM');
const faker = require('faker');
const {roles} = require('./../../config/app.config');

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
        const randParent = {
            username: faker.internet.userName(),
            password: '$2b$10$bVYPXUbI5N8yTtkJVcKPbelQZA7eRB.KI5fa.U1bM3ox7Ze8RuFAe',
            role: roles.PARENT
        }
        try {
            const user = await db.user.create(randParent);
            req.body.userID = user.id;
            const parentModel = new ParentModel();
            const rs = await parentModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log('e', e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const parentModel = new ParentModel();
            const rs = await parentModel.update({...req.body, id: req.params.id})
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