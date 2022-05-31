const router = require("express").Router();

const packagingRoute = require("./packagingRoute");
const productsRoute = require("./productsRoute");
const orderRoute = require("./orderRoute");

router.use("/packaging", packagingRoute);
router.use("/products", productsRoute);
router.use("/order", orderRoute);

module.exports = router;
