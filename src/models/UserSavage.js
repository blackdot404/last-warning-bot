const sequelize = require('../database/connection');
const { DataTypes } = require('sequelize');

const UserSavage = sequelize.define('UserSavage', {
    Guild: DataTypes.STRING,
    SavageChannel: DataTypes.STRING,
});

module.exports = UserSavage;
