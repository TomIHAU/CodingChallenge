const router = require("express").Router();

const { Packaging, Products, Options } = require("../../models");

// need get where product id on packaging
// need business logic

//order args are the product code and a quantity ordered

router.get("/", async (req, res) => {
  try {
    console.log(req.body, "helllo");
    let totalCost = 0;
    for (let key in req.body) {
      const ProductData = await Products.findOne({ where: { code: key } });
      console.log(ProductData.get({ plain: true }), "oooooooooooo");
    }
    const packaging = await packagingData.map((Data) =>
      Data.get({ plain: true })
    );
    res.status(200).json(packaging);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
