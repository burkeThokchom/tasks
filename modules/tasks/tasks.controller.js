const tasksService = require('./services');
const { MESSAGES } = require('../../configs');

exports.createTask = async (req, res, next) => {
    try {
        let { body } = req;
        const responsePayload = await tasksService.createTask(body);
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.end(JSON.stringify({ message: MESSAGES?.TASKS?.created || '', data: {...responsePayload}}));
        return res;
    } catch (error) {
        next(error);
    }
};
exports.getAll  = async (req, res, next) =>{
    try {
        const { body } = req;
        const responsePayload = await tasksService.getAll(body);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: MESSAGES?.TASKS?.fetched || '', data: responsePayload}));
        return res;
    } catch (error) {
        next(error);
    }
}
exports.updateTask = async(req, res, next) =>{
    try {
        const { body } = req;
        const {params: {id}} = req; 
        const responsePayload = await tasksService.updateTask(body, id);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: MESSAGES?.TASKS?.updated || '', data: responsePayload}));
        return res;
    } catch (error) {
        next(error);
    }
}
exports.getTaskMetrics = async (req, res, next) =>{
    try {
        const { body  } = req;
        const responsePayload = await tasksService.getTaskMetrics(body);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: MESSAGES?.TASKS?.metricFetched || '', data: responsePayload}));
        return res;
    } catch (error) {
        next(error);
    }
}
exports.deleteTask = async (req, res, next) =>{
    try {
        const { params: { id }  } = req;
        const responsePayload = await tasksService.deleteTask(id);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: MESSAGES?.TASKS?.deleted || '', data: responsePayload}));
        return res;
    } catch (error) {
        next(error);
    }
}



