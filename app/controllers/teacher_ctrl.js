const { RESPONSE_STATUS, Response, Controller } = require('../base');
const TeacherModel = require('../models/teacher_model');
const db = require('./../../modelsORM');
const faker = require('faker');
const {roles} = require('./../../config/app.config');

class TeacherController extends Controller {
    constructor() {
        super();
    }

    async get(req, res) {
        try {
            const teacherModel = new TeacherModel();
            const rs = await teacherModel.getAll();
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async getId(req, res) {
        try {
            const teacherModel = new TeacherModel();
            const rs = await teacherModel.get(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async add(req, res) {
        const randTeacher = {
            username: faker.internet.userName(),
            password: '$2b$10$bVYPXUbI5N8yTtkJVcKPbelQZA7eRB.KI5fa.U1bM3ox7Ze8RuFAe',
            role: roles.TEACHER
        }
        try {
            const user = await db.user.create(randTeacher);
            req.body.userID = user.id;
            const teacherModel = new TeacherModel();
            const rs = await teacherModel.add(req.body);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log(e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async update(req, res) {
        try {
            const teacherModel = new TeacherModel();
            console.log("request body", req.body, req.params);
            const rs = await teacherModel.update({...req.body, id: req.params})
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
    async remove(req, res) {
        try {
            const teacherModel = new TeacherModel();
            const rs = await teacherModel.del(req.params.id);
            res.json(new Response(RESPONSE_STATUS.SUCCESS, rs))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = TeacherController;