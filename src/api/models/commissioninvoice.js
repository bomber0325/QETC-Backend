"use strict";

const { Model } = require("sequelize");
// const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommissionInvoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommissionInvoice.belongsTo(models.University, {
        foreignKey: "universityID",
      });
      CommissionInvoice.belongsTo(models.InvoiceModuleStatus, {
        foreignKey: "statusID",
      });
      CommissionInvoice.belongsTo(models.Branch, {
        foreignKey: "branchID",
      });
    }
  }
  CommissionInvoice.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      itemdate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      recipient: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusID: {
        type: DataTypes.INTEGER,
        // <<<<<<< HEAD
        //         allowNull: false,
        //       },
        //       universityID: {
        //         type: DataTypes.INTEGER,
        //         allowNull: false,
        //       },
        //       branchID: {
        //         type: DataTypes.INTEGER,
        //         allowNull: false,
        // =======
        allowNull: true,
        defaultValue: Math.floor(Math.random() * 4 + 1),
      },
      universityID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: Math.floor(Math.random() * 4 + 1),
      },
      branchID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: Math.floor(Math.random() * 4 + 1),
      },
    },
    {
      sequelize,
      modelName: "CommissionInvoice",
      tableName: "CommissionInvoice".toLowerCase(),
    }
  );
  // const level = await CommissionInvoice.findAll();
  return CommissionInvoice;
};
