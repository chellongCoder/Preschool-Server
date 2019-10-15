const express = require('express');
class BaseRouter {
    constructor() {
        this.router = express.Router();
        this.config();
        this.loadInvalidRoute();
    }

    config() {}

    getRouter() {
        return this.router;
    }
    addRouter(method, path, ctrl, middleware) {
        switch (method) {
            case 'GET': 
                this.addGetRouter(path, ctrl, middleware);
                break;
            case 'POST': 
                this.addPostRouter(path, ctrl, middleware);
                break;
            case 'PUT': 
                this.addPutRouter(path, ctrl, middleware);
                break;
            case 'DELETE': 
                this.addDeleteRouter(path, ctrl, middleware);
                break;
        }
    }
    addGetRouter(path, ctrl, middleware){
        if (middleware) {
            this.router.get(path, middleware, ctrl);
        }
        else {
            this.router.get(path, ctrl);
        }
    }
    addPostRouter(path, ctrl, middleware){
        if (middleware) this.router.post(path, middleware, ctrl);
        else this.router.post(path, ctrl);
    }
    addPutRouter(path, ctrl, middleware){
        if (middleware) this.router.put(path, middleware, ctrl);
        else this.router.put(path, ctrl);
    }
    addDeleteRouter(path, ctrl, middleware){
        if (middleware) this.router.delete(path, middleware, ctrl);
        else this.router.delete(path, ctrl);
    }    
    loadInvalidRoute() {
        this.router.get('*', (req, res) => { res.status(404).contentType("text/plain").end('Invalid GET request') });
        this.router.post('*', (req, res) => { res.status(404).contentType("text/plain").end('Invalid POST request') });
        this.router.delete('*', (req, res) => { res.status(404).contentType("text/plain").end('Invalid DELETE request') });
    }
}

module.exports = BaseRouter;