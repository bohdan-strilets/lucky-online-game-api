const express = require("express");

const { statistics: ctrl } = require("../controllers");
const { ctrlWrapper, auth } = require("../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getInfo));

module.exports = router;
