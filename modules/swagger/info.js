const { version, name, author, description } = require('../../package.json');

module.exports = {
    openapi: '3.0.1',
    info: {
        version,
        title: name,
        description,
        contact: {
            name: author,
        },
    },
};
