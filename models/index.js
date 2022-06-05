const Products = require("./Products");
const Options = require("./Options");

Options.belongsTo(Products, {
  foreignKey: "product_id",
  onDelete: "cascade",
});

Products.hasMany(Options, {
  foreignKey: "product_id",
});

module.exports = { Products, Options };
