const sequelize = require('../database/connection');
const UserGuild = require('./UserGuild');
const { DataTypes } = require('sequelize');

const UserReacts = sequelize.define('UserReacts', {
    idEmoji: DataTypes.STRING,
    idRole: DataTypes.STRING,
    idGroup: DataTypes.INTEGER,
});

UserReacts.belongsTo(UserGuild, { foreignKey: 'Guild' });
UserReacts.belongsTo(UserGuild, { foreignKey: 'ClassChannel' });

module.exports = UserReacts;
