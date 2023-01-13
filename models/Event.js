const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    where: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    organizer: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'event',
  }
);

module.exports = Event;
