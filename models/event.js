'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User,{foreignKey:'user_id'})
      Event.hasMany(models.Media,{foreignKey:'event_id'})
    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    heur: DataTypes.STRING,
    user_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};