const Products = require("./Products");
const Options = require("./Options");
const Packaging = require("./Packaging");
const Order = require("./Order");

Packaging.belongsTo(Products, {
  foreignKey: "product_id",
});

Products.hasMany(Packaging, {
  foreignKey: "product_id",
});

module.exports = { Products, Options, Packaging, Order };
