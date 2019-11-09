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

    addMoment = async (data) => {
        const moment = {
            content: data.content,
            likes: 0,
            author_id: data.author_id,
            status_accept: 1
        }
        const images = data.images;
        const momentRs = await db.moment.create(moment);
        console.log("moment", momentRs);
        if(images) {
            console.log("images")
            for (let index = 0; index < images.length; index++) {
                const element = {
                    imageID: images[index].id,
                    momentID: momentRs.id
                };
                const image_moment = await db.image_moment.create(element);
                console.log("element", image_moment);
                if(index === images.length-1) {
                    const rs = await this.getMomentById(momentRs.id);
                    return rs;
                }
            }

        } else {
            const rs = await this.getMomentById(momentRs.id);
            console.log("msadasd", rs);
            return rs;
        }
        // return 
    }
}
module.exports = MomentModel