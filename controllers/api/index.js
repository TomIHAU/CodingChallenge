const router = require("express").Router();

const packagingRoute = require("./packagingRoute");

router.use("/packaging", packagingRoute);

module.exports = router;
