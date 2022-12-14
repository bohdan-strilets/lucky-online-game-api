const { User } = require("../models");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized.",
      });
    }

    const { email } = jwt.verify(token, ACCESS_TOKEN_KEY);
    console.log(email);

    if (!email) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "jwt expired" || error.message === "jwt malformed") {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Not authorized.",
      });
    }
    next(error);
  }
};

module.exports = auth;
