const BaseRouter = require('./base_router');
const { ApiCtrl, AuthCtrl, MomentCtrl, ParentCtrl, ImageCtrl, TeacherCtrl, StudentCtrl} = require('../controllers');
const ApiVerify = require('../middleware/api_verify');

class ApiRouter extends BaseRouter{
    constructor() {
        super();
    }
    config() {
        const apiCtrl = new ApiCtrl();
        const authCtrl = new AuthCtrl();
        const momentCtrl = new MomentCtrl();
        const parentCtrl = new ParentCtrl();
        const imageCtrl = new ImageCtrl();
        const teacherCtrl = new TeacherCtrl();
        const studentCtrl = new StudentCtrl();
        //Api Auth
        this.addRouter('POST', '/user/register', authCtrl.register.bind(authCtrl));
        this.addRouter('POST', '/user/login', authCtrl.login.bind(authCtrl));
        this.addRouter('POST', '/user/forgot', authCtrl.forgotPassword.bind(authCtrl));
        this.addRouter('POST', '/user/resetpass', authCtrl.resetPassword.bind(authCtrl));
        
        //Basic Api
        this.addRouter('GET', '/user/me', apiCtrl.getInfo.bind(apiCtrl), ApiVerify.verifyAccesskey);

        this.routerCtrl(momentCtrl, "moments");
        this.routerCtrl(parentCtrl, "parent");
        this.routerCtrl(imageCtrl, "image");
        this.routerCtrl(teacherCtrl, "teacher");
        this.routerCtrl(studentCtrl, "student");
    }

    
    routerCtrl(routerCtrl, routerName) {
        this.addRouter('GET', `/${routerName}`, routerCtrl.get.bind(routerCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('GET', `/${routerName}/:id`, routerCtrl.getId.bind(routerCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('POST', `/${routerName}`, routerCtrl.add.bind(routerCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('PUT', `/${routerName}/:id`, routerCtrl.update.bind(routerCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('DELETE', `/${routerName}/:id`, routerCtrl.remove.bind(routerCtrl), ApiVerify.verifyAccesskey);
    }
}

module.exports = ApiRouter;