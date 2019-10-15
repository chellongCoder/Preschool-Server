class RootController {
    constructor() {
        
    }

    async index(req, res) {
        try {
            res.render('pages/index');
        } catch (e) {
            console.log(e);
        }
    }

    async reset(req, res) {
        try {
            const url = `${req.query.redirect_url}?token=${req.query.token}`;
            res.render('pages/reset', {redirect_url: url});
        } catch (e) {
            console.log(e);
        }
    }

}
module.exports = RootController;