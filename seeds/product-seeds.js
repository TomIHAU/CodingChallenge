const { Products } = require("../models");

const productData = [
  {
    name: "Cheese",
    code: "CE",
    price: 595,
  },
  {
    name: "Ham",
    code: "HM",
    price: 795,
  },
  {
    name: "Soy Sauce",
    code: "SS",
    price: 1195,
  },
];

const seedProducts = () => Products.bulkCreate(productData);

module.exports = seedProducts;
