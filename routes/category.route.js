const router = require("express").Router();
const controller = require("./../controller/category.controller");

router.get("/", controller.findAll);

router.post("/", controller.save);

router.get("/:id", controller.findOne);

router.put("/:id", controller.updateById);

router.patch("/:id", controller.updateById);

router.delete("/delete/:id", controller.delete);

module.exports = router;
