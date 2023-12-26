const sequelize = require('../database/connection');
const { DataTypes } = require('sequelize');

/**
 * GroupMessage é criado somente para agrupar os emoji no sistema de react
 * ele irá definir para cada
 */

const GroupMessage = sequelize.define('GroupMessage', {});
