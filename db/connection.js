require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres', // Specify the database dialect
        logging: false, // Disable logging; default: console.log
    }
)

// Test the connection

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected successfully.');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
    }
}
testConnection();

module.exports = sequelize;