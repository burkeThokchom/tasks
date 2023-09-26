const tasksRepo = require('../tasks.repository');
const { sequelize } = require("../../../database/models");

module.exports = async (id) => {
    let transaction;
    try{
        transaction = await sequelize.transaction();
        const currentTask = await tasksRepo.getOne({where: {id}});
        console.log(currentTask)
        if(!currentTask){
            throw new Error(MESSAGES.TASKS.t404)
        }
        const resp = await tasksRepo.deleteTask(id, transaction);
        await transaction.commit();
        return resp;
    }
    catch(error){
        if (transaction) {
            await transaction.rollback();
        }
        throw new Error(error.message || "Error while deleting task.")
    }


};
