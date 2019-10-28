const BaseModel = require('../base/base_model');
const TABLE = 'notifications';
const db = require('./../../modelsORM');

class NotifyModel extends BaseModel {

    constructor(version) {
        super(TABLE, version);
    }

    getNotificationById = async (id) => {
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
            const notification = await db['notification'].findAll(query);
            console.log("notification", notification);
            return notification;
        } catch (error) {
            console.log("error", error);
        }
    } 
}
module.exports = NotifyModel;