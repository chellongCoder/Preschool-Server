const { RESPONSE_STATUS, Response } = require('../base');
const Token = require('../utils/token');
class ApiVerify {

    static verifyAccesskey(req, res, next) {
        try {
            console.log('request', req.headers);
            const auth = req.headers['authorization'].split(' ');
            
            if (auth[0] === 'Bearer') {
                if (Token.decode(auth[1])) {
                    const rs = Token.verify(auth[1]);
                    if (rs.error)
                        res.json(new Response(RESPONSE_STATUS.ERROR, {}, {code: '510', message: rs.error}));
                    else 
                        next();
                } 
                else {
                    res.json(new Response(RESPONSE_STATUS.ERROR, {}, {code: '520', message: "Accesskey is not valid"}));
                }
            } else {
                res.json(new Response(RESPONSE_STATUS.ERROR, {}, {code: '500', message: "Accesskey is not valid"}));
            }
        } catch( e ) {
            console.log("error", e);
            res.json(new Response(RESPONSE_STATUS.ERROR, {}, {code: '500', message: "Accesskey is not valid"}));
        }
    }
}

module.exports = ApiVerify;