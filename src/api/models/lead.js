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
      Lead.hasOne(models.ProgrameDetails, {
        foreignKey: "leadId",
        as: "ProgrameDetail",
      });
      Lead.belongsTo(models.Branch, {
        foreignKey: "branchID",
      });
      Lead.belongsTo(models.Programme, {
        foreignKey: "programID",
      });
      Lead.belongsTo(models.LeadsManagmentModuleStatus, {
        foreignKey: "statusID",
      });
      Lead.belongsTo(models.University, {
        foreignKey: "universityID",
      });
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
      programID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      universityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      branchID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statusID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Lead",
      tableName: "leads",
    }
  );
  return Lead;
};
