const router = require("express").Router();
const { Products } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const { name, code, price } = req.body;
    //returns a 400 if the user doesn't send all the key value pairs
    if (!name || !code || !price) {
      res.status(400).json({ message: "please input all required data" });
      return;
    }
    const newProduct = await Products.create({
      name,
      code,
      price,
    });
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

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

router.put("/:id", async (req, res) => {
  try {
    const { name, code, price } = req.body;
    //returns a 400 if the user doesn't send all the key value pairs
    if (!name || !code || !price) {
      res.status(400).json({ message: "please input all required data" });
      return;
    }
    const productChange = await Products.update(
      { name, code, price },
      { where: { id: req.params.id } }
    );

    res.status(200).json(productChange);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: cascading delete still not working.
router.delete("/:id", async (req, res) => {
  try {
    const prod_id = await Products.findByPk(req.params.id);
    if (!prod_id) {
      res.status(400).json({ message: "cant find the id of this product" });
      return;
    }
    await prod_id.destroy();
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
