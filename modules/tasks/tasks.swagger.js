const { generateSwaggerAPI } = require('../swagger/generateSwaggerAPI');
const {
    CONSTANTS: { SWAGGER },
    MESSAGES,
} = require('../../configs');

exports.tasksPath = {
    '/tasks/add': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.tasks,
            operationId: 'addTask',
            method: SWAGGER.methods.post,
            security: false,
            description: '<h3>Description:</h3> ' +
                '<p>&emsp;&emsp; Create a task</p>'
            ,
            requestBodyRef: '#/definitions/AddTaskInput',
            responseStatuses: {
                200: {
                    ref: '#/definitions/AddTaskResponse',
                },
                201: {
                    ref: '#/definitions/AddTaskResponse',
                },
                401: false,
                415: false,
            },
        }),
    },
    '/tasks/get-all': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.tasks,
            operationId: 'getAllTasks',
            method: SWAGGER.methods.post,
            security: true,
            description: '<h3>Description:</h3> ' +
                '<p>&emsp;&emsp; Get All Tasks</p>'
            ,
            requestBodyRef: '#/definitions/GetTasksInput',
            responseStatuses: {
                200: {
                    ref: '#definitions/GetTermsResponse',
                },
                401: false,
                415: false,
            },
        }),

    },
    '/tasks/update/{id}': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.tasks,
            operationId: 'updateTask',
            method: SWAGGER.methods.put,
            security: true,
            description: '<h3>Description: Update Task</h3> ',
            parameters: [
                {
                    type: 'integer',
                    in: 'path',
                    name: 'id',
                    required: ['id'],
                }
            ],
            requestBodyRef: '#/definitions/UpdateTaskInput',
            responseStatuses: {
                200: {
                    ref: '#definitions/UpdateTaskResponse',
                },
                401: false,
                415: false,
            },
        }),

    },
    '/tasks/get/metrics': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.tasks,
            operationId: 'getMetrics',
            method: SWAGGER.methods.post,
            security: true,
            description: '<h3>Description:</h3> ' +
                '<p>Pls provide empty object if you need overall stats </p>'+
                '<p>Or pls provide start date and end dates in epoch</p>'        
            ,
            requestBodyRef: '#/definitions/GetMetricsInput',
            responseStatuses: {
                200: {
                    ref: '#/definitions/GetMetricsResponse',
                },
                415: false
            }
        })
    },

    '/tasks/delete/{id}': {
        ...generateSwaggerAPI({
            tag: SWAGGER.tags.tasks,
            operationId: 'deleteTask',
            method: SWAGGER.methods.delete,
            security: true,
            description: '<h3>Description:</h3> ' +
                '<p>&emsp;&emsp; Delete task. </p>'        
            ,
            parameters: [
                {
                    type: 'integer',
                    in: 'path',
                    name: 'id',
                    required: ['id'],
                }
            ],
            responseStatuses: {
                200: {
                    ref: '#/definitions/DeleteTaskResponse',
                },
                415: false
            }
        })
    }
};

const tasksSchema = {
    id: {
        type: 'number',
        description: 'An id of the NFT Drop',
        example: 1,
    },
    name: {
        type: 'string',
        description: 'Name of task',
        example: 'Game Time',
    },
    description:{
        type: 'string',
        description: 'Description of task',
        example: 'Start steam and double click dota',
    },
    status: {
        type: 'string',
        description: 'Status of task',
        example: 'active'
    }
};


exports.tasksDefinitions = {
    AddTaskInput: {
        type: 'object',
        properties: {
            name: tasksSchema.name,
            description: tasksSchema.description,
            status:  tasksSchema.status
        },
        required: ['name','description'],
    },
    AddTaskResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.TASKS.created,
            },
            data: {
                type: 'object',
                example:{"id": 1}
            },
        },
    },
    GetTasksInput: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                example:1,
            },
            items: {
                type: 'integer',
                example:5,
            },
            search: {
                type: 'string',
                example:"",
            },
            filter: {
                type: 'object',
                example:{status: "active"},
            }
        },
        required: ['page','items', 'filter'],
    },
    GetTermsResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.TASKS.fetched,
            },
            data: {
                allOf: [
                    {
                        type: 'object',
                        example:{
                            pageMeta: {
                                totalItems:8,
                                page:1,
                                items:5
                            },
                            list:[
                                {
                                    "id": 1,
                                    "title": "Let's game",
                                    "status": "active",
                                    "description": "Open steam and play valorant",
                                    "createdAt": "2023-09-26T11:30:56.051Z",
                                    "updatedAt": "2023-09-26T11:30:57.052Z"
                                },
                                {
                                    "id": 2,
                                    "title": "Work on sidekick",
                                    "status": "pending",
                                    "description": "Write payments feature in sidekick app",
                                    "createdAt": "2023-09-26T11:30:56.051Z",
                                    "updatedAt": "2023-09-26T11:30:57.052Z"
                                },
                            ]
                        }

                    }
                ],
            },
        },
    },
    UpdateTaskInput: {
        type: 'object',
        properties: {
            name: tasksSchema.name,
            description: tasksSchema.description,
            status: tasksSchema.status
        },
        required: ['name','description', 'status'], // since this is a put request, i am setting it to required as a standard practice
    },
    UpdateTaskResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.TASKS.updated,
            },
            data: {
                type: 'object',
                example:{}
            },
        },
    },

    GetMetricsInput: {
        type: 'object',
        properties: {
            startDate: {
                type: 'date',
                description: 'Start date in epoch',
                example: '1687340912000',
            },
            endDate: {
                type: 'date',
                description: 'End Date in epoch',
                example: '1695764178264',
            }
        },
        required: [], 
    },
  
 
    GetMetricsResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.TASKS.metricFetched,
            },
            data: {
                type: 'object',
                example: {
                    "id": 1,
                    "title": "Test 1",
                    "fileUrl": "https://test1.com",
                    "type": 1,
                    "isActive": true
                },
            },
        },
    },
    DeleteTaskResponse: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                example: MESSAGES.TASKS.deleted,
            },
            data: {
                type: 'object',
                example: {}
            },
        },
    }
};
