const router = require("express").Router();

const packagingRoute = require("./packagingRoute");
const productsRoute = require("./productsRoute");

router.use("/packaging", packagingRoute);
router.use("/products", productsRoute);

module.exports = router;
