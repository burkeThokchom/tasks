require('dotenv').config();
module.exports = {
    APP: {
        env: process.env.NODE_ENV || 'local',
        port: process.env.PORT || 3001,
        backendUrl: process.env.BACKEND_URL
    },
    SWAGGER: {
        tags: {
            tasks:'Tasks'
        },
        methods: {
            post: 'post',
            get: 'get',
            patch: 'patch',
            delete: 'delete',
            put: 'put',
        },
    },
    PAGINATION: {
        orderBy: {
            ascending: 'ASC',
            descending: 'DESC',
        },
        items: 10,
        page: 1,
    },
    ALLOWEDSTATUS: [
        "active",
        "open",
        "completed"

    ]
};
