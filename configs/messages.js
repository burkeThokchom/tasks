const CONSTANTS = require('./constants');
module.exports = {
    APP: {
        serverError: 'Something went wrong!',
    },
    TASKS: {
        created: "Task created.",
        duplicateTask: "Task with the same name already exists.",
        fetched: "Tasks fetched.",
        t404: "Task does not exist.",
        updated: "Task updated",
        statusError: `Status can either be ${CONSTANTS.ALLOWEDSTATUS.join(', ')}.`,
        metricFetched: "Task metrics fetched.",
        deleted: "Task deleted."
    }
  
};

