const { Token } = require("../../models");
const { payloadGenerator, tokenGenerator } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { REFRESH_TOKEN_KEY } = process.env;

const refreshUser = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized.",
    });
  }

  const userData = jwt.verify(refreshToken, REFRESH_TOKEN_KEY);
  const tokenFromDB = await Token.findOne({ owner: userData.id });

  if (!userData || !tokenFromDB) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized.",
    });
  }

  const payload = payloadGenerator(userData);
  const tokens = await tokenGenerator(payload);

  return res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({
      status: "ok",
      code: 200,
      tokens,
    });
};

module.exports = refreshUser;
