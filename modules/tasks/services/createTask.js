const { v4: uuid } = require('uuid');
const tasksRepo = require('../tasks.repository');
const { MESSAGES, CONSTANTS } = require('../../../configs');
const { sequelize, Sequelize} = require("../../../database/models"); 

module.exports = async (body, pdf=null) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const checkName = body['name'].toLowerCase().trim();
        const existingTask = await tasksRepo.getOne({where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), checkName)});
        if(existingTask){
            throw new Error(`${MESSAGES.TASKS.duplicateTask}`);
        }
        if(!CONSTANTS.ALLOWEDSTATUS.includes(body['status'].toLowerCase())){
            throw new Error(MESSAGES.TASKS.statusError)
        }
        const tasksData = {
            name: body['name'].toLowerCase().trim(),
            description: body['description'].toLowerCase().trim(),
            status: body['status'].toLowerCase().trim(),
        }
        const resp = await tasksRepo.createTask(tasksData);
        await transaction.commit();
        return {id: resp['id']} 
    }
    catch(error){
        if (transaction) {
            await transaction.rollback();
        }
        throw new Error(error?.message || "Error in creating task")
    }


};
