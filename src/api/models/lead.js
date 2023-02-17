"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lead.hasOne(models.ProgrameDetails);
    }
  }
  Lead.init(
    {
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      passportNo: DataTypes.INTEGER,
      leadGroup: DataTypes.STRING,
      country: DataTypes.STRING,
      phoneNo: DataTypes.INTEGER,
      email: DataTypes.STRING,
      refferalName: DataTypes.STRING,
      refferalEmail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Lead",
    }
  );
  return Lead;
};
