const BaseModel = require('../base/base_model');
const TABLE = 'moments';
const db = require('./../../modelsORM');

class MomentModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    getMomentById = async (id) => {
        try {
            const query = {
                where: {
                    id
                },
                include: [{
                    model: db.image,
                    as: 'image',
                    required: false,
                    // Pass in the tag attributes that you want to retrieve
                    attributes: ['id', 'path'],
                    through: {
                        attributes: []
                    }
                }]
            }
            const moment = await db['moment'].findAll(query);
            console.log("moment", moment);
            return moment;
        } catch (error) {
            console.log("error", error);
        }
    } 

    getMoments = async () => {
        try {
            const query = {
                include: [
                    {
                        model: db.image,
                        as: 'image',
                        required: false,
                        // Pass in the tag attributes that you want to retrieve
                        attributes: ['id', 'path'],
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: db.teacher,
                        as: 'teacher',
                    }
                ]
            }
            const moment = await db['moment'].findAll(query);
            console.log("moment", moment);
            return moment;
        } catch (error) {
            console.log("error", error);
        }
    }
}
module.exports = MomentModel