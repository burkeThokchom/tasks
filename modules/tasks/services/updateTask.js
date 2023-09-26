const tasksRepo = require('../tasks.repository');
const { sequelize } = require("../../../database/models");
const { MESSAGES, CONSTANTS } = require('../../../configs');


module.exports = async (body, id) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const currentTask = await tasksRepo.getOne({where: {id}});
        if(!currentTask){
            throw new Error(MESSAGES.TASKS.t404)
        }
        if(!CONSTANTS.ALLOWEDSTATUS.includes(body['status'].toLowerCase())){
            throw new Error(MESSAGES.TASKS.statusError)
        }
        const tasksData = {
            name: body['name'].toLowerCase().trim(),
            description: body['description'].toLowerCase().trim(),
            status: body['status'].toLowerCase().trim(),
        }
        const resp = await tasksRepo.updateTask(tasksData, {id}, transaction);
        await transaction.commit();
        return resp
    }
    catch(error){
        if (transaction) {
            await transaction.rollback();
        }
        console.log(error)
        throw new Error(error?.message || "Error in updating task")
    }


};
