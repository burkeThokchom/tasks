require('dotenv').config();
module.exports = {
    local: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
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
