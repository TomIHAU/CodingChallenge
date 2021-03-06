const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Options extends Model {}

Options.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    packaging_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "packaging",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "options",
  }
);

module.exports = Options;
