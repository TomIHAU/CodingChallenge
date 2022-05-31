const { Options } = require("../models");

const OptionsData = [
  {
    packaging_id: 1,
    quantity: 3,
    price: 1495,
  },
  {
    packaging_id: 1,
    quantity: 5,
    price: 2095,
  },
  {
    packaging_id: 2,
    quantity: 2,
    price: 1395,
  },
  {
    packaging_id: 2,
    quantity: 5,
    price: 2995,
  },
  {
    packaging_id: 2,
    quantity: 8,
    price: 4095,
  },
];

const seedOptions = () => Options.bulkCreate(OptionsData);

module.exports = seedOptions;
