require('dotenv').config();
module.exports = {
    local: {
        username: 'postgres',
        password: 'pg-admin',
        database: 'tasks',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        seederStorage: 'sequelize',
        seederStorageTableName: 'sequelizeData',
        dialectOptions: { decimalNumbers: true },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
};
