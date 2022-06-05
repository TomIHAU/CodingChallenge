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
    let package;

    const exists = await Packaging.findOne({
      where: { product_id: req.params.id },
    });

    if (!exists) {
      console.log("askdlfjhalskdjfhlaskjdfhlaskjdfhlaskjdfhlaskjdfhl");
      const packagingData = await Packaging.Create({
        product_id: req.params.id,
      });
      
      console.log(packagingData);
      package = packagingData.get({ plain: true });
    } else {
      package = exists.get({ plain: true });
    }
    console.log("exists", exists ? true : false);
    console.log("packagingData", package);
    const { quantity, price } = req.body;

    console.log("quantity, price", quantity, price);

    if (!quantity || !price) {
      res.status(400).json({ message: "please input new options data" });
    }
    const newOption = await Options.create({
      packaging_id: package.id,
      quantity,
      price,
    });
    res.status(200).json(newOption);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
