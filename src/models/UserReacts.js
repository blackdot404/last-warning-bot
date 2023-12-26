const sequelize = require('../database/connection');
const UserGuild = require('./UserGuild');
const GroupMessage = require('./GroupMessage');
const { DataTypes } = require('sequelize');

const UserReacts = sequelize.define('UserReacts', {
    idEmoji: DataTypes.STRING,
    idRole: DataTypes.STRING,
});

UserReacts.belongsTo(UserGuild, { foreignKey: 'Guild' });
UserReacts.belongsTo(UserGuild, { foreignKey: 'ClassChannel' });

GroupMessage.belongsTo(GroupMessage, { foreignKey: 'idGroupMessage' });

module.exports = UserReacts;
