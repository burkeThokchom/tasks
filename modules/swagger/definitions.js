module.exports = {
    BadRequest: {
        type: 'object',
        properties: {
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'number',
                        example: 400,
                    },
                    type: {
                        type: 'string',
                        example: 'Bad Request',
                    },
                    message: {
                        type: 'string',
                        description: 'Relevant error message',
                    },
                    data: {
                        type: 'object',
                    },
                },
            },
        },
    },

    PreConditionFailed: {
        type: 'object',
        properties: {
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'number',
                        example: 412,
                    },
                    type: {
                        type: 'string',
                        example: 'Precondition Failed',
                    },
                    message: {
                        type: 'string',
                        description: 'Relevant error message',
                    },
                    data: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                description: 'Relevant error message',
                            },
                            path: {
                                type: 'array',
                            },
                            type: {
                                type: 'string',
                                example: 'any.required',
                            },
                            context: {
                                type: 'object',
                                properties: {
                                    label: {
                                        type: 'string',
                                    },
                                    key: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

    Unauthorized: {
        type: 'object',
        properties: {
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'number',
                        example: 401,
                    },
                    type: {
                        type: 'string',
                        example: 'Unauthorized',
                    },
                    message: {
                        type: 'string',
                        description: 'Relevant error message',
                    },
                    data: {
                        type: 'object',
                    },
                },
            },
        },
    },

    InternalServerError: {
        type: 'object',
        properties: {
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'number',
                        example: 500,
                    },
                    type: {
                        type: 'string',
                        example: 'Internal Server Error',
                    },
                    message: {
                        type: 'string',
                        description: 'Relevant error message',
                    },
                    data: {
                        type: 'object',
                    },
                },
            },
        },
    },
    UnsupportedMedia: {
        type: 'object',
        properties: {
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'number',
                        example: 415,
                    },
                    type: {
                        type: 'string',
                        example: 'Error',
                    },
                    message: {
                        type: 'string',
                        description: 'Unsupported media type',
                    },
                    data: {
                        type: 'object',
                    },
                },
            },
        },
    },
    UserNotFound: {
        type: 'object',
        properties: {
            error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        example: 404,
                    },
                    type: {
                        type: 'string',
                        example: 'Error',
                    },
                    message: {
                        type: 'string',
                        example: 'User not Found',
                    },
                    data: {
                        type: 'object',
                        example: {},
                    },
                },
            },
        },
    },
};
