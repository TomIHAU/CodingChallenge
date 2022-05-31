const Products = require("./Products");
const Options = require("./Options");
const Packaging = require("./Packaging");
const Order = require("./Order");

Packaging.belongsTo(Products, {
  foreignKey: "product_id",
  onDelete: "cascade",
});

Products.hasMany(Packaging, {
  foreignKey: "product_id",
  onDelete: "cascade",
});

Packaging.hasMany(Options, {
  foreignKey: "packaging_id",
  onDelete: "cascade",
});

Options.hasOne(Packaging, {
  foreignKey: "packaging_id",
  onDelete: "cascade",
});

module.exports = { Products, Options, Packaging, Order };
