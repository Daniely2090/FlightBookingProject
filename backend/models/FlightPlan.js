const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FlightPlan = sequelize.define('FlightPlan', {
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flightNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  airline: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = FlightPlan;
