const { HTTP_CODES } = require('../configs');

class ErrorResponse extends Error {
    constructor(message, err = null) {
        super(message);
        this.type = 'Error Response';
        this.statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
        this.err = err;
    }
}

module.exports = ErrorResponse;
