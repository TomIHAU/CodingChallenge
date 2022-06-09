const router = require("express").Router();
const { Options, Products } = require("../../models");

function testNeg(price) {
  return price <= 0;
}

router.get("/", async (req, res) => {
  try {
    const productData = await Products.findAll({
      include: Options,
    });
    const packaging = await productData.map((Data) =>
      Data.get({ plain: true })
    );
    //returns the data in the structure requested in the assignment.
    res.status(200).json(
      packaging.map((e) => {
        return {
          code: e.code,
          options: [...e.options],
        };
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const productData = await Products.findByPk(req.params.id);

    if (!productData) {
      res.status(400).json({ message: "the product id does not exist" });
    }

    const { quantity, price } = req.body;

    if (!quantity || !price) {
      res.status(400).json({ message: "please input new options data" });
    }
    if (!typeof price === "number" || testNeg(price)) {
      res
        .status(400)
        .json({ message: "cant have a price be negative or zero" });
      return;
    }
    const newOption = await Options.create({
      product_id: req.params.id,
      quantity,
      price,
    });

    res.status(200).json(newOption);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
