const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { addSchema, updateSchema, getAllSchema, getMetricsSchema, deleteSchema } = require('./tasks.validations');
const tasksController = require('./tasks.controller');

const router = express.Router();

router.post('/add', 
//set auths middleware if needed
    validationMiddleware(addSchema), 
    tasksController.createTask
);

router.post('/get-all', 
    validationMiddleware(getAllSchema), 
    tasksController.getAll
);

router.put('/update/:id', 
    validationMiddleware(updateSchema), 
    tasksController.updateTask
);

router.post('/get/metrics', 
    validationMiddleware(getMetricsSchema), 
    tasksController.getTaskMetrics
);
router.delete('/delete/:id', 
    validationMiddleware(deleteSchema), 
    tasksController.deleteTask
);




module.exports = router;