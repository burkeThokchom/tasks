const Joi = require('joi');

exports.addSchema = {
    body: Joi.object().keys({
        name: Joi.string().label('Name').required(),
        description: Joi.string().label('Description').required(),
        status: Joi.string().label('Status').default('open').optional(),
    }),
};
exports.updateSchema = {
    body: Joi.object().keys({
        name: Joi.string().label('Name').required(),
        description: Joi.string().label('Description').required(),
        status: Joi.string().label('Status').required(),
    }), 
    params: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
}
exports.getAllSchema = {
    body: Joi.object().keys({
        search: Joi.string().trim().allow("").default("").optional(),
        page: Joi.number().required(),
        items: Joi.number().required(),
        filter: Joi.required()
    }),
};
exports.getMetricsSchema = {
    body: Joi.object().keys({
        startDate: Joi.number().optional(),
        endDate: Joi.number().optional()
    }),
};
exports.deleteSchema = {
    params: Joi.object().keys({
        id: Joi.number().min(1).required()
    }),
};