const router = require("express").Router();
const { Packaging, Options } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const packagingData = await Packaging.findAll({});
    const packaging = await packagingData.map((Data) =>
      Data.get({ plain: true })
    );
    res.status(200).json(packaging);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const packagingData = await Packaging.findAll({});
    const packaging = await packagingData.map((Data) =>
      Data.get({ plain: true })
    );
    res.status(200).json(packaging);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
