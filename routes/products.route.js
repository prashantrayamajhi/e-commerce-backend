const router = require("express").Router();

const controller = require("./../controller/product.controller");

router.get("/", controller.getProducts);

router.get("/:id", controller.findById);

router.post("/", controller.save);

router.put("/:id", controller.updateById);

router.patch("/:id", controller.updateById);

router.delete("/delete/:id", controller.deleteById);

module.exports = router;
