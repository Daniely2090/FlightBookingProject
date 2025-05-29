const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
  flightPlanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Reservation;
