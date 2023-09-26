const tasksRepo = require('../tasks.repository');

module.exports = async (body) => {
    try{
        const query = {
            type: 'full'
        }
        if(body.startDate && body.endDate){
            query['type'] = 'partial';
            query['startDate'] = body['startDate'];
            query['endDate'] = body['endDate'];
        }
        if(body.startDate && !body.endDate){
            query['type'] = 'partial';
            query['startDate'] = body['startDate'];
            query['endDate'] = new Date()
        }
        if(!body.startDate && body.endDate){
            query['type'] = 'partial';
            query['startDate'] =  new Date();
            query['endDate'] = body['endDate'];
        }
        const resp = await tasksRepo.getMetrics(query);
        return resp
    }
    catch(error){
        throw new Error(error.message || "Error while fetching task metric.")
    }


};
