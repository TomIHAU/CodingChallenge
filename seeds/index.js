const sequelize = require("../config/connection");
const {} = require("../models");

const seedProducts = require("./product-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("DATABASE SYNCED");

  await seedProducts();
  console.log("PRODUCTS SYNCED");

  process.exit(0);
};

seedAll();
