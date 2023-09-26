const { Op } = require('sequelize');
const { CONSTANTS } = require('../../configs');
const { Tasks, Sequelize } = require('../../database/models');
const { getPagination } = require('../../helpers');
const moment = require('moment');

exports.createTask = async (data,t = null) => {
    return Tasks.create(data, { transaction: t });
};

exports.getOne = async (query)=>{
    return Tasks.findOne(query, {plain: true});
}
exports.updateTask = async (data, query,  t = null)=>{
    return Tasks.update(data, { where: query, transaction:t});
}
exports.getAll = async (params) =>{
    const where = {};
    let sortBy = params?.filter?.sortBy || 'createdAt';
    const orderBy = params?.filter?.orderBy || CONSTANTS.PAGINATION.orderBy.descending;
    where[Op.and] = [];
    const { limit, offset } = getPagination(params.page, params.items);
    if(sortBy==="name"){
        sortBy = Sequelize.fn('lower', Sequelize.col('name'))
    }
    if (params.search) {
            where[Op.and].push({
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${params.search}%`,
                        },
                    },
                    {
                        status: {
                            [Op.iLike]: `%${params.search}%`,
                        },
                    }
                ],
            });

    }

    if (params.filter) {
        if (params.filter.status) {
            where[Op.and].push({
                status: {
                    [Op.iLike] : `%${params.filter.status}%`,
                }
            });
        }
        if (params.filter.name) {
            where[Op.and].push({
                name: {
                    [Op.iLike] : `%${params.filter.name}%`,
                }
            });
        }
        if (params.filter.ids) {
            where[Op.and].push({
                id: {
                    [Op.in] : [...params.filter.ids],
                }
            });
        }
    }

    return await Tasks.findAndCountAll({
        attributes: ['id','name', 'description', 'createdAt', 'updatedAt', 'status'],
        where,
        limit,
        offset,
        order: [[sortBy, orderBy]],
    });
}
exports.deleteTask = async (id, t = null) => {
    return Tasks.destroy({where: {id:id}, transaction: t});
}
exports.getMetrics = async (params) =>{
    let query = {};
    if(params['type'] === 'full'){
        query = {
            raw: true,
            group:['status'],
            attributes: ['status', [Sequelize.fn('COUNT', Sequelize.col('status')), 'count']],
            where: {}
        }

        const taskMetric = await Tasks.findAll(query);
        const resp = {};
        taskMetric.forEach(metric=>{
            resp[metric['status']] = metric['count']
        })
        return resp

    }
    else{
        console.log(moment(params.startDate), moment(params.endDate))
        where = {
            createdAt: {
                [Op.between]: [moment(params.startDate), moment(params.endDate)]
            }
        }
        query = {
            raw: true,
            attributes: [
                [Sequelize.fn('date', Sequelize.col('createdAt')), 'date'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN status = 'active' THEN 1 ELSE 0 END")), 'active_tasks'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN status = 'open' THEN 1 ELSE 0 END")), 'open_tasks'],
                [Sequelize.fn('SUM', Sequelize.literal("CASE WHEN status = 'completed' THEN 1 ELSE 0 END")), 'completed_tasks'],
                ],
            group: ['date'],
            where
        };

        const taskMetric = await Tasks.findAll(query);
        return taskMetric

        
    }
    
}