const BaseModel = require('../base/base_model');
const TABLE = 'activities';
const db = require('./../../modelsORM');

class ActivityModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    getActivityById = async (id) => {
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
            const activity = await db['activity'].findAll(query);
            console.log("activity", activity);
            return activity;
        } catch (error) {
            console.log("error", error);
        }
    } 
}
module.exports = ActivityModel;