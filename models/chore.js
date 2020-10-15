'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chore.belongsTo(models.Child)
    }
  };
  Chore.init({
    name: DataTypes.STRING,
    complete: DataTypes.BOOLEAN,
    mon: DataTypes.BOOLEAN,
    tue: DataTypes.BOOLEAN,
    wed: DataTypes.BOOLEAN,
    thu: DataTypes.BOOLEAN,
    fri: DataTypes.BOOLEAN,
    sat: DataTypes.BOOLEAN,
    sun: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Chore',
  });
  return Chore;
};