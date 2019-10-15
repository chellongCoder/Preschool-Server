var nodemailer = require('nodemailer');
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dev.hnteam@gmail.com',
                pass: '10Phokimma'
            }
        });
    }

    send(to, subject, template, opt) {
        const TEMPLATE = [
            `
            <p>Tài khoản của bạn đã được yêu cầu <b>ĐẶT LẠI MẬT KHẨU.</b></p> 
            <p>Truy cập vào đường link dưới để đặt lại mật khẩu mới</p> 
            <a href="${opt.link}">Đặt lại mật khẩu</a>`,
        ];
        const mailOptions = {
            from: 'dev.hnteam@gmail.com', // sender address
            to: to, // list of receivers
            subject: subject, 
            disableUrlAccess: false,
            html: TEMPLATE[template]
        };
        this.transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
    }
}

module.exports = MailService;