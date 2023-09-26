const defaultStatuses = {
    200: {
        description: 'Success',
        content: {
            'application/json': {
                schema: {
                    $ref: {
                        type: 'object',
                        properties: {
                            error: {
                                type: 'object',
                                properties: {
                                    code: {
                                        type: 'number',
                                        example: 200,
                                    },
                                    type: {
                                        type: 'string',
                                        example: 'Success',
                                    },
                                    message: {
                                        type: 'string',
                                        description: 'Success',
                                    },
                                    data: {
                                        type: 'object',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    400: {
        description: 'Bad Request',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/definitions/BadRequest',
                },
            },
        },
    },
    412: {
        description: 'Precondition failed',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/definitions/PreConditionFailed',
                },
            },
        },
    },
    500: {
        description: 'Internal server error',
        content: {
            'application/json': {
                schema: {
                    $ref: '#/definitions/InternalServerError',
                },
            },
        },
    },
};

exports.generateSwaggerAPI = ({
    method,
    tag,
    operationId,
    description,
    parameters = null,
    requestBodyRef = null,
    requestBodyContentType = null,
    produces = ['application/json'],
    security = false,
    responseStatuses = {},
}) => {
    const newResponseStatuses = { ...defaultStatuses };

    Object.keys(defaultStatuses).forEach((key) => {
        newResponseStatuses[key] = {
            description:
                responseStatuses[key] && responseStatuses[key].description
                    ? responseStatuses[key].description
                    : defaultStatuses[key].description,
            content: {
                'application/json': {
                    schema: {
                        $ref:
                            responseStatuses[key] && responseStatuses[key].ref
                                ? responseStatuses[key].ref
                                : defaultStatuses[key].content['application/json'].schema.$ref,
                    },
                },
            },
        };

        if (responseStatuses[key] === false) delete newResponseStatuses[key];
    });
    let content = {};
    if (requestBodyContentType) {
        content[requestBodyContentType] = {
            schema: {
                $ref: requestBodyRef,
            },
        };
    } else {
        content['application/json'] = {
            schema: {
                $ref: requestBodyRef,
            },
        };
    }
    return {
        [method]: {
            tags: [tag],
            operationId,
            description,
            produces,
            security: security
                ? [
                      {
                          bearerAuth: [],
                      },
                  ]
                : [],
            parameters: parameters ? parameters : [],
            requestBody: requestBodyRef ? { content } : {},
            responses: {
                ...newResponseStatuses,
            },
        },
    };
};
