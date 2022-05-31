const router = require("express").Router();

const { Packaging, Products, Options } = require("../../models");

// need get where product id on packaging
// need business logic

//order args are the product code and a quantity ordered

router.get("/", async (req, res) => {
  try {
    console.log(req.body, "helllo");
    let totalCost = 0;

    //loops through the order by key
    for (let key in req.body) {
      // if(!key){
      //     res.status(400).json({message:"no su"})
      // }
      const productData = await Products.findOne({
        where: { code: key },
      });
      if (!productData) {
        res
          .status(400)
          .json({ message: "no such product please try ordering again" });
        return;
      }
      const product = productData.get({ plain: true });

      const packagingData = await Packaging.findOne({
        where: { product_id: product.id },
        include: Options,
      });
      if (packagingData) {
        const packaging = packagingData.get({ plain: true });
        console.log(packaging, "aaaaaaaaaaa");
      }

      console.log(product, "oooooooooooo");
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
