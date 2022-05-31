const { Packaging } = require("../models");

const PackagingData = [
  {
    product_id: 1,
  },
  {
    product_id: 2,
  },
];

const seedPackaging = () => Packaging.bulkCreate(PackagingData);

module.exports = seedPackaging;
