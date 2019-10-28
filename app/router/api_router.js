const BaseRouter = require('./base_router');
const { ApiCtrl, AuthCtrl, MomentCtrl, ParentCtrl, ImageCtrl, TeacherCtrl, StudentCtrl, ActivityCtrl, NotifyCtrl, ClassCtrl, SchoolCtrl, MealTypeCtrl, WeekPlanCtrl, AbsenseCtrl, StudyResultCtrl, TuitionCtrl} = require('../controllers');
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