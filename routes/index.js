const express = require('express');
const swaggerUI = require('swagger-ui-express');
const { tasksRoutes } = require('../modules/tasks');
const swagger = require('../modules/swagger');
const { version } = require('../package.json');


const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res) => {
    res.send(`API Endpoint is working. Version - ${version}`);
});

// Main Routes
router.use('/tasks', tasksRoutes);

// Swagger documentation
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

module.exports = router;



