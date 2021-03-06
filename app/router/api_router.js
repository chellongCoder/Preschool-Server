const BaseRouter = require('./base_router');
const { ApiCtrl, AuthCtrl, MomentCtrl, ParentCtrl, ImageCtrl, TeacherCtrl, StudentCtrl, ActivityCtrl, NotifyCtrl, ClassCtrl, SchoolCtrl, MealTypeCtrl, WeekPlanCtrl, AbsenseCtrl, StudyResultCtrl, TuitionCtrl, UploadCtrl, QRCodeCtrl} = require('../controllers');
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
        const activityCtrl = new ActivityCtrl();
        const notifyCtrl = new NotifyCtrl();
        const classCtrl = new ClassCtrl();
        const schoolCtrl = new SchoolCtrl();
        const mealTypeCtrl = new MealTypeCtrl();
        const weekPlanCtrl = new WeekPlanCtrl();
        const absenseCtrl = new AbsenseCtrl();
        const studyResultCtrl = new StudyResultCtrl();
        const tuitionCtrl = new TuitionCtrl();
        const uploadCtrl = new UploadCtrl();
        const qrCodeCtrl = new QRCodeCtrl();
        //Api Auth
        this.addRouter('POST', '/user/register', authCtrl.register.bind(authCtrl));
        this.addRouter('POST', '/user/login', authCtrl.login.bind(authCtrl));
        this.addRouter('POST', '/user/forgot', authCtrl.forgotPassword.bind(authCtrl));
        this.addRouter('POST', '/user/resetpass', authCtrl.resetPassword.bind(authCtrl));
        
        //Basic Api
        this.addRouter('GET', '/user/me', apiCtrl.getInfo.bind(apiCtrl), ApiVerify.verifyAccesskey);

        this.routerCtrl(momentCtrl, "moment");
        this.routerCtrl(parentCtrl, "parent");
        this.routerCtrl(imageCtrl, "image");
        this.routerCtrl(teacherCtrl, "teacher");
        this.routerCtrl(studentCtrl, "student");
        this.routerCtrl(activityCtrl, "activity");
        this.routerCtrl(notifyCtrl, "notify");
        this.routerCtrl(classCtrl, "class");
        this.routerCtrl(schoolCtrl, "school");
        this.routerCtrl(mealTypeCtrl, "mealType");
        this.routerCtrl(weekPlanCtrl, "weekPlan");
        this.routerCtrl(absenseCtrl, "absense");
        this.routerCtrl(studyResultCtrl, "studyResult");
        this.routerCtrl(tuitionCtrl, "tuition");
        this.routerCtrl(qrCodeCtrl, "qrCodeCheckin");
        
        this.addRouter('GET', '/class/getClassByTeacher/:id', classCtrl.getClassByTeacher.bind(classCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('GET', '/student/getStudentByClass/:id', studentCtrl.getStudentByClass.bind(studentCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('GET', '/student/getStudentByParent/:id', studentCtrl.getStudentByParent.bind(studentCtrl), ApiVerify.verifyAccesskey);
        this.addRouter('GET', '/student/getStudentBYQRCodeCheckin/:date', studentCtrl.getStudentBYQRCodeCheckin.bind(studentCtrl));
        
        this.addRouter('POST', '/uploadImage', uploadCtrl.add.bind(uploadCtrl));
        
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