'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.hasMany(models.MembreConversation,{foreignKey:'conversation_id'})
      Conversation.hasMany(models.Message,{foreignKey:'conversation_id'})
    }
  }
  Conversation.init({
    last_message: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};