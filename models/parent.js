'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parent.hasMany(models.Child)
    }
  };
  Parent.init({
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        min: 5,
      }
    },
    weeklyPrize: {
      allowNull: false,
      defaultValue: 'Ice Cream',
      type: DataTypes.STRING
    },
    points: {
      allowNull: false,
      defaultValue: 200,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Parent',
  });
  return Parent;
};