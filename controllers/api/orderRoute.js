const router = require("express").Router();

const { Packaging, Products, Options } = require("../../models");

router.get("/", async (req, res) => {
  try {
    let totalCost = 0;
    let totalPackages = 0;
    let bestOrder;

    //loops through the order by key. the request data structure should use the product code as the key and the order amount as the value e.g. CE:10

    for (let key in req.body) {
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
      console.log(product, "helllllo");
      const packagingData = await Packaging.findOne({
        where: { product_id: product.id },
        include: Options,
      });

      if (packagingData) {
        const packaging = packagingData.get({ plain: true });

        //sorts the options by the quantity. so the order can be more easily divided up.
        const optionsSorted = packaging.options
          .map((e) => e)
          .sort((a, b) => b.quantity - a.quantity);

        // starts the index at a different point in the while loop to insure the lowest package amount can be found;
        // e.g. if a packages of 90 and 33 exist and an order of 99 is requested
        // it would need to start at the 1st index for the lowest possible package number (3)

        let bestPackage;
        let bestItemCost = 0;
        for (let i = 0; i < optionsSorted.length; i++) {
          let reqAmount = req.body[key];
          let orderAmount = 0;
          let cost = 0;
          let order = [];

          // loops through the options while there is requests left and
          // while there are possible options to pick from and while it has less orders than the lowest ordered

          while (
            reqAmount > 0 &&
            i < optionsSorted.length &&
            (!bestPackage || orderAmount < bestPackage)
          ) {
            console.log(i, cost);
            if (optionsSorted[i].quantity > reqAmount) {
              i++;
            } else {
              reqAmount -= optionsSorted[i].quantity;
              cost += optionsSorted[i].price;
              orderAmount++;
            }
          }
          if (reqAmount > 0) {
            // if no packages are found. or if products remain.
            // adds the products to the total cost without discount.
            cost += reqAmount * product.price;
            orderAmount += reqAmount;
          }

          if (!bestPackage || orderAmount < bestPackage) {
            bestPackage = orderAmount;
            bestItemCost = cost;
          }
          console.log("yep here i am", cost, orderAmount);
        }

        //adds cost and packages after best conditions are found
        totalCost += bestItemCost;
        totalPackages += bestPackage;

        console.log(optionsSorted);
      }
    }
    console.log(totalCost);
    console.log(totalPackages);
    res.status(200).json({
      message: `total cost is $${(totalCost / 100).toFixed(
        2
      )}, total number of packages is ${totalPackages}`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
