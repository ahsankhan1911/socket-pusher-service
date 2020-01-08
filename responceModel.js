class ResponseModel {

    constructor (status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message
    }
}

module.exports = ResponseModel