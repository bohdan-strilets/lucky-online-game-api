const express = require("express");

const { auth: ctrl } = require("../controllers");
const { validation, ctrlWrapper, auth } = require("../middlewares");
const { signupJoiSchema, signinJoiSchema } = require("../models/user");

const router = express.Router();

router.post("/signup", validation(signupJoiSchema), ctrlWrapper(ctrl.signup));

router.post("/signin", validation(signinJoiSchema), ctrlWrapper(ctrl.signin));

router.get("/signout", auth, ctrlWrapper(ctrl.signout));

module.exports = router;
