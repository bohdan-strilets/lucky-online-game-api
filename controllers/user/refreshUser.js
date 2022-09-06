const { Token, User } = require("../../models");
const { payloadGenerator, tokenGenerator } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { REFRESH_TOKEN_KEY } = process.env;

const refreshUser = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.code(401).json({
      status: "error",
      code: 401,
      message: "Not authorized.",
    });
  }

  const userData = jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
  const user = await User.findOne({ email: userData.email });
  const tokenFromDB = await Token.findOne({ owner: userData.id });

  if (!userData || !tokenFromDB) {
    return res.code(401).json({
      status: "error",
      code: 401,
      message: "Not authorized.",
    });
  }

  const payload = payloadGenerator(user);
  const tokens = await tokenGenerator(payload);

  return res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      status: "ok",
      code: 200,
      tokens,
    });
};

module.exports = refreshUser;
