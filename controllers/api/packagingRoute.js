const router = require("express").Router();
const { Packaging, Options, Products } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const packagingData = await Packaging.findAll({
      include: [{ model: Options }, { model: Products }],
    });
    const packaging = await packagingData.map((Data) =>
      Data.get({ plain: true })
    );
    //returns the data in the structure requested in the assignment.
    res.status(200).json(
      packaging.map((e) => {
        return {
          code: e.product.code,
          options: [
            ...e.options.map((e) => {
              return { quantity: e.quantity, price: e.price };
            }),
          ],
        };
      })
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const exists = await Packaging.findOne({
      where: { product_id: req.params.id },
    });
    if (!exists) {
      const packagingData = await Packaging.Create({
        product_id: req.params.id,
      });
    }
    const { quantity, price } = req.body;
    if (!quantity || !price) {
      res.status(400).json({ message: "please input new options data" });
    }
    const newOption = await Options.create({
      packaging_id: req.params.id,
      quantity,
      price,
    });
    res.status(200).json(newOption);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
