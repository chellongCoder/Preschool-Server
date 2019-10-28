const { RESPONSE_STATUS, Response, Controller } = require('../base');
const SchoolModel = require('../models/school_model');
const db = require('./../../modelsORM');
const faker = require('faker');
const {roles} = require('./../../config/app.config');

class SchoolController extends Controller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const schoolModel = new SchoolModel();
            const rs = await schoolModel.getAll();
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async getId(req, res) {
        try {
            const schoolModel = new SchoolModel();
            const rs = await schoolModel.get(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async add(req, res) {
        const randUserSchool = {
            username: faker.internet.userName(),
            password: '$2b$10$bVYPXUbI5N8yTtkJVcKPbelQZA7eRB.KI5fa.U1bM3ox7Ze8RuFAe',
            role: roles.SCHOOL
        }
        try {
            const user = await db.user.create(randUserSchool);
            req.body.userID = user.id;
            const schoolModel = new SchoolModel();
            const rs = await schoolModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const schoolModel = new SchoolModel();
            console.log("request body", req.body, req.params);
            const rs = await schoolModel.update({...req.body, id: req.params})
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async remove(req, res) {
        try {
            const schoolModel = new SchoolModel();
            const rs = await schoolModel.del(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = SchoolController;