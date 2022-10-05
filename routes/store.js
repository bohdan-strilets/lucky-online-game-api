const express = require("express");

const { store: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const { itemJoiSchema } = require("../models/store");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:itemId", auth, ctrlWrapper(ctrl.getOne));

router.post("/", auth, validation(itemJoiSchema), ctrlWrapper(ctrl.addOne));

module.exports = router;
