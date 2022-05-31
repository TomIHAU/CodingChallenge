const router = require("express").Router();
const { Products } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const productsData = await Products.findAll({});

    const products = await productsData.map((Data) =>
      Data.get({ plain: true })
    );

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
