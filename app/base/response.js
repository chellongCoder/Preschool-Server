
class Response {
    /**
     * 
     * @param {*} status [success | fail | error] 
     * @param {*} data 
     * @param {*} errors 
     */
    constructor(status, data, errors = null) {
        this.status = status;
        this.data = data;
        this.errors = errors;
    }
}
module.exports = Response;