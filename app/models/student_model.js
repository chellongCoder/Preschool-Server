const BaseModel = require('../base/base_model');
const TABLE = 'students';
const db = require('./../../modelsORM');

class StudentModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    getStudentByClass = async (idClass) => {
        const query = {
            where: {
                class_id: idClass
            },
            include: [
                { 
                    model: db.school, as: 'school', 
                },
                { 
                    model: db.class, as: 'class',
                },
                { model: db.parent, as: 'parent' }
            ]
        }
        try {
            const students = await db['student'].findAll(query);
            console.log("students", students);
            return students;
        } catch (error) {
            console.log("e", error);
            return [];
        }
    }

    getStudentByParent = async (idParent) => {
        const query = {
            where: {
                parent_id: idParent
            },
            include: [
                { 
                    model: db.school, as: 'school', 
                },
                { 
                    model: db.class, as: 'class',
                },
                { model: db.parent, as: 'parent' }
            ]
        }
        try {
            const students = await db['student'].findAll(query);
            console.log("students", students);
            return students;
        } catch (error) {
            console.log("e", error);
            return [];
        }
    }
}
module.exports = StudentModel;