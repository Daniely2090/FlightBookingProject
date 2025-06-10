const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'flightdb',
  process.env.DATABASE_USER || 'postgres',
  process.env.DATABASE_PASSWORD || '123456',
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
    retry: {
      max: 10,
    },
  }
);

module.exports = sequelize;
