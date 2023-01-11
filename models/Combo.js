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
        },
    },
    dishID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'dish',
          key: 'id',
        },
    },
    eventID: {
        type: DataTypes.INTEGER,
        references: {
          model: 'event',
          key: 'id',
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
