const sequelize = require("../config/connection");

const seedProducts = require("./product-seeds");
const seedOptions = require("./options-seeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("---------------DATABASE SYNCED---------------");

  await seedProducts();
  console.log("---------------PRODUCTS SYNCED---------------");

  await seedOptions();
  console.log("---------------options SYNCED---------------");

  process.exit(0);
};

seedAll();
