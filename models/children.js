'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Child.belongsTo(models.Parent)
      Child.hasMany(models.Chore)
      Child.hasMany(models.Point)
    }
  };
  Child.init({
    first_name: {
      allowNull:false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull:false,
      type: DataTypes.STRING
    },
    user_name: {
      allowNull:false,
      type: DataTypes.STRING
    },
    password: {
      allowNull:false,
      type: DataTypes.STRING
    },
    childImage: {
      allowNull:false,
      type: DataTypes.STRING 
    }
  }, {
    sequelize,
    modelName: 'Child',
  });
  return Child;
};