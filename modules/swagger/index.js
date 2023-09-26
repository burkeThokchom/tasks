const info = require('./info');
const servers = require('./servers');
const definitions = require('./definitions');
const components = require('./components');
const { tasksPath, tasksDefinitions } = require('../../modules/tasks/tasks.swagger');

const swag = {
    ...info,
    ...servers,
    paths: {
        ...tasksPath
    },
    definitions: {
        ...definitions,
        ...tasksDefinitions
    },
    components: {
        ...components,
    },
};

module.exports = swag;
