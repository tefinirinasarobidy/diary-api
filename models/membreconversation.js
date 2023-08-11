'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MembreConversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MembreConversation.belongsTo(models.Conversation,{foreignKey:'conversation_id'})
      MembreConversation.belongsTo(models.User,{foreignKey:'user_id'})
    }
  }
  MembreConversation.init({
    user_id: DataTypes.BIGINT,
    conversation_id:  DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'MembreConversation',
  });
  return MembreConversation;
};