const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized.",
      });
    }

    const { id } = jwt.verify(token, ACCESS_TOKEN_KEY);
    const user = await User.findById(id);

    if (!user) {
      res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized",
      });
    }

    if (!user.isVerified) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Email not activated.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
