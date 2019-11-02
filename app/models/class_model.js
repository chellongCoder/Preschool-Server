const BaseModel = require('../base/base_model');
const TABLE = 'classes';
const db = require('./../../modelsORM');
class ClassModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    getClassByTeacher = async (idTeacher) => {
        const query = {
            where: {
                homeroom_teacher: idTeacher
            },
            include: [
                { 
                    model: db.school, as: 'school', 
                }
            ]
        }
        try {
            const _class = await db['class'].findAll(query);
            console.log("_class", _class);
            return _class;
        } catch (error) {
            console.log("e", error);
            return [];
        }
    }
}
module.exports = ClassModel;