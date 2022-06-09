const router = require("express").Router();

const { Products, Options } = require("../../models");

router.get("/", async (req, res) => {
  try {
    let totalCost = 0;
    let totalPackages = 0;
    let bestOrder = [];

    //loops through the order by key. the request data structure should use the product code as the key and the order amount as the value
    // e.g. CE:10

    for (let key in req.body) {
      const productData = await Products.findOne({
        where: { code: key },
        include: Options,
      });

      //returns a 400 if the user has entered the wrong key -> if the product doesn't exist
      if (!productData) {
        res
          .status(400)
          .json({ message: "no such product please try ordering again" });
        return;
      }

      const product = productData.get({ plain: true });

      if (product.options[0]) {
        //sorts the options by the quantity. so the order can be more easily divided up.
        product.options.push({ price: product.price, quantity: 1 });
        const optionsSorted = product.options.sort(
          (a, b) => a.price / a.quantity - b.price / b.quantity
        );

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
          let j = i;
          // loops through the options while there is requests left and
          // while there are possible options to pick from and while it has less orders than the lowest ordered

          while (
            reqAmount > 0 &&
            j < optionsSorted.length &&
            (!bestItemCost || cost < bestItemCost)
          ) {
            if (optionsSorted[j].quantity > reqAmount) {
              j++;
            } else {
              reqAmount -= optionsSorted[j].quantity;
              cost += optionsSorted[j].price;
              orderAmount++;
              order.push(optionsSorted[j]);
            }
          }

          if (!bestItemCost || cost < bestItemCost) {
            bestPackage = orderAmount;
            bestItemCost = cost;
            bestOrder = [...bestOrder, ...order];
          }
        }

        //adds cost and packages after best conditions are found
        totalCost += bestItemCost;
        totalPackages += bestPackage;
      } else {
        //if no packaging exists for the product it adds it directly to the totals
        totalCost += req.body[key] * product.price;
        totalPackages += req.body[key];
        bestOrder.push({ singleOrders: req.body[key], code: key });
      }
    }
    res.status(200).json({
      message: `total cost is $${(totalCost / 100).toFixed(
        2
      )}, total number of packages is ${totalPackages}`,
      totalCost: (totalCost / 100).toFixed(2),
      totalPackages,
      bestOrder,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
