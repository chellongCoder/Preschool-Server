const { RESPONSE_STATUS, Response, Controller } = require('../base');
const Hash = require('../utils/hash');
const Token = require('../utils/token');
const UserModel = require('../models/user_model');
const MailService = require('../utils/mailservice');
const db = require('./../../modelsORM');

class AuthController extends Controller {

    constructor() {
        super();
        this.userModel = new UserModel();
    }

    async forgotPassword(req, res) {
        try {
            // check email
            const user = await this.userModel.getBy({ email: req.body['email'] });
            if (user.length > 0) {
                const token = Token.sign({ 'email': req.body['email'] }, '1h');
                const redirect_url = req.body['redirect_url'];
                const mailService = new MailService();
                mailService.send(req.body['email'], 'Base App - Đặt lại mật khẩu', 0, { link: `http://localhost:8080/user-update/reset-password?redirect_url=${redirect_url}&token=${token}` })
                res.json(new Response(RESPONSE_STATUS.SUCCESS, {}));
            } else {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '501', message: 'Email không tồn tại' }));
            }

        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '500', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }

    async resetPassword(req, res) {
        try {
            const hash = await Hash.encrypt(req.body['password']);

            const token = Token.decode(req.body['token']);
            const userInfo = await this.userModel.getBy({ email: token.payload.email });
            const rs = await this.userModel.update({
                'id': userInfo[0].id,
                'password': hash
            })
            const signData = {
                'fullname': userInfo[0].fullname,
                'username': userInfo[0].username,
                'email': userInfo[0].email,
                'phone': userInfo[0].phone
            }
            const accesskey = Token.sign(signData);

            if (rs)
                res.json(new Response(RESPONSE_STATUS.SUCCESS, { ...signData, 'accesskey': accesskey }));
            else
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, {code: '500', message: 'Reset không thành công.'}));
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '500', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }

    async register(req, res) {
        try {
            const hash = await Hash.encrypt(req.body['password']);
            req.body['password'] = hash;
            if (req.body['username'].length < 3) {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '400', message: 'Tên đăng nhập phải lớn hơn 8 ký tự.' }))
                return;
            };
            if (Number.isInteger(req.body['is_boss']) && Number.isInteger(req.body['is_boss']) >= 0) {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '400', message: 'is_boss chỉ có thể là 0 hoặc 1' }));
                return;
            }
            if (Number.isInteger(req.body['is_admin']) && Number.isInteger(req.body['is_admin']) >= 0) {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '400', message: 'is_admin chỉ có thể là 0 hoặc 1' }));
                return;
            }
            if (Number.isInteger(req.body['is_teacher']) && Number.isInteger(req.body['is_teacher']) >= 0) {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '400', message: 'is_teacher chỉ có thể là 0 hoặc 1' }));
                return;
            }
            if (Number.isInteger(req.body['is_parent']) && Number.isInteger(req.body['is_parent']) >= 0) {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '400', message: 'is_parent chỉ có thể là 0 hoặc 1' }));
                return;
            }
            if (Number.isInteger(req.body['is_student']) && Number.isInteger(req.body['is_student']) >= 0) {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, { code: '400', message: 'is_student chỉ có thể là 0 hoặc 1' }));
                return;
            }

            const rs = await this.userModel.add(req.body);
            console.log('create new user with id: ', rs);
            let user = await this.getUserMapping(rs);
            console.log("user", user);
            const accesskey = Token.sign({
                'username': req.body['username'],
                ...user[0].dataValues
            });
            delete rs[0]['password'];
            if (rs)
                res.json(new Response(RESPONSE_STATUS.SUCCESS, { ...req.body, ...user[0].dataValues, 'accesskey': accesskey }));
            else
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, {code: '500', message: 'Đăng ký tài khoàn thất bại.'}));
        } catch (e) {
            console.log("e",e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '500', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }

    async login(req, res) {
        try {
            const rs = await this.userModel.auth(req.body.username, req.body.password);
            console.log("rs", rs);
            if (rs.status != 'error') {
                let user = await this.getUserMapping(rs);
                console.log("user", user);
                const accesskey = Token.sign({
                    'username': req.body['username'],
                    ...user[0].dataValues,
                    'role': rs[0]['role']
                });
                delete rs[0]['password'];
                
                res.json(new Response(RESPONSE_STATUS.SUCCESS, { ...rs[0], ...user[0].dataValues, 'accesskey': accesskey }));
            }
            else {
                res.json(new Response(RESPONSE_STATUS.FAIL, req.body, {code: '500', message: 'Đăng nhập thất bại.'}));
            }
        } catch (e) {
            console.log("e", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }

    async getUserMapping (rs) {
        let query = {
            where: {
                userID: rs[0]['id']
            }
        }
        let user = null;
        switch (rs[0]['role']) {
            case 10:
                user = await db['school'].findAll(query);
                break;
            case 11:
                user = await db['teacher'].findAll(query);
                break;
            case 12:
                user = await db['parent'].findAll(query);
                break;
            default:
                break;
        }
        return user;
    }
}
module.exports = AuthController;
