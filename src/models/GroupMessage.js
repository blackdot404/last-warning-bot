const sequelize = require('../database/connection');
const { DataTypes } = require('sequelize');
const UserReacts = require('./UserReacts');

/**
 * GroupMessage é criado somente para agrupar os emoji no sistema de react
 * ele irá definir para cada id grupo um id message para saber qual grupo
 * a messagem pertence
 */

const GroupMessage = sequelize.define('GroupMessage', {
  idGroupMessage: DataTypes.STRING,
});

UserReacts.belongsTo(UserReacts, { foreignKey: 'idGroup' });


module.exports = GroupMessage;

