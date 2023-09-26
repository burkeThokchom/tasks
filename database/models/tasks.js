'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Tasks extends Model {

    static associate(models) {
    // assosiation goes here
    }
  }
  Tasks.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: 'open'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: Tasks.name,
    tableName: 'tasks',
    paranoid: true,
    timestamps: true,
    indexes: [
      {
        unique: false,
        fields: ['name']
      }
    ],
  });
  return Tasks;
};
