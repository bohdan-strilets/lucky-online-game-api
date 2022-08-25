const express = require("express");

const { bets: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const { betJoiSchema, isWonJoiSchema } = require("../models/bets");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:betsId", auth, ctrlWrapper(ctrl.getOne));

router.post("/", auth, validation(betJoiSchema), ctrlWrapper(ctrl.createBet));

router.put("/", auth, validation(isWonJoiSchema), ctrlWrapper(ctrl.changeBet));

module.exports = router;
