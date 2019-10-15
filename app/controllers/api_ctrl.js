const { RESPONSE_STATUS, Response, Controller } = require('../base');
const Token = require('../utils/token');
const UserModel = require('../models/user_model');

class ApiController extends Controller {
    constructor() {
        super();
    }

    async getInfo(req, res) {
        try {
            const userModel = new UserModel();
            const auth = req.headers['authorization'].split(' ');
            const token = Token.decode(auth[1] ? auth[1] : auth[0]);
            const userInfo = await userModel.getBy({ username: token.payload.username });
            res.json(new Response(RESPONSE_STATUS.SUCCESS, {
                id: userInfo[0].id,
                username: userInfo[0].username,
                fullname: userInfo[0].fullname,
                email: userInfo[0].email,
                phone: userInfo[0].phone
            }))
        } catch (e) {
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, { code: '400', message: 'Có lỗi xảy ra. Vui lòng liên hệ để được giải đáp.' }));
        }
    }
}
module.exports = ApiController;