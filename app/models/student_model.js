const BaseModel = require('../base/base_model');
const TABLE = 'students';
const db = require('./../../modelsORM');
const Sequelize = require('sequelize')
var moment = require('moment-timezone');
const Op = Sequelize.Op;

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

    getStudentBYQRCodeCheckin = async (date) => {
        console.log("date", new Date(date).setHours(new Date().getHours()+7, new Date().getMinutes(), 0, 0), new Date().getHours());
        let time = new Date(date).setHours(new Date().getHours()+7, new Date().getMinutes(), 0, 0);
        const queryCheckin = {
            where:{
                updatedAt: {
                  [Op.lt]: new Date(date).setHours(31,0,0,0),
                  [Op.gt]: new Date(date).setHours(7,0,0,0)
                }
            },
        }
        const query = (id) => {
            
            return {
                where:{
                    id
                },
                include: [{
                    model: db.class,
                    as: 'class',
                    required: false,
                    // Pass in the tag attributes that you want to retrieve
                    attributes: ['id', 'class_name'],
                    
                    through: {
                      attributes: []
                    }
                }],
            }
        }
        try {
            const checkin = await db['qrcode_checkin'].findAll(queryCheckin);
            const students = [];
            console.log("checkin", checkin);
            for (let index = 0; index < checkin.length; index++) {
                const element = checkin[index];
                const student = await db['student'].findAll(query(element.studentID));
                students.push(student[0]);
            }            
            console.log("students", students);
            return students;
        } catch (error) {
            console.log("e", error);
            return [];
        }
    }
}
module.exports = StudentModel;