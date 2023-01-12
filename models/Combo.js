const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Combo extends Model {}

Combo.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
          unique: false
        },
    },
    dishID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'dish',
          key: 'id',
          unique: false
        },
    },
    eventID: {
        type: DataTypes.UUID,
        references: {
          model: 'event',
          key: 'id',
          unique: false
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'combo',
  }
);

module.exports = Combo;
