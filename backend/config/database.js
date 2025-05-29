const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'flightdb',
  process.env.DB_USER || 'admin',
  process.env.DB_PASSWORD || 'secret',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
    retry: {
      max: 10, // נסה להתחבר עד 10 פעמים לפני כשל
    },
  }
);

module.exports = sequelize;
