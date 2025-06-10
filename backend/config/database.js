const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'flightdb',
  process.env.DATABASE_USER || 'admin',
  process.env.DATABASE_PASSWORD || 'secret',
  {
    host: process.env.DATABASE_HOST || 'flightbookingproject-database-1',
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
    retry: {
      max: 10,
    },
  }
);

module.exports = sequelize;
