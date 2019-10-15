const MyProgress = require('./utils/progress');
const UserUnitModel = require('./models/user_unit_model');
const calc = async (userId, unit) => {
    try {
        const userUnitModel = new UserUnitModel(2);
        const p = new MyProgress(userId);
        const avg = await p.getUnitCompRate(unit);
        
        console.log(unit, avg);
        
        userUnitModel.updateBy({completed: avg}, {user_id: userId, actived_unit: unit});            
    } catch (e) {
        console.log('====================================');
        console.log(e);
        console.log('====================================');
    }
}

(async () => {
    for (let i = 1; i <= 21; i++)
        await calc(461, i);
})()