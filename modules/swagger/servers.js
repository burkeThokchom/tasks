const { CONSTANTS } = require('../../configs');
const { description } = require('../../package.json');

module.exports = {
    servers: [
        {
            url: CONSTANTS.APP.backendUrl,
            description,
        },
    ],
};
