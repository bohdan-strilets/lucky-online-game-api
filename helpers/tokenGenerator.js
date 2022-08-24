const { Token } = require("../models");
const jwt = require("jsonwebtoken");

const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

const tokenGenerator = async (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn: "30m" });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, {
    expiresIn: "30d",
  });

  const tokens = {
    accessToken,
    refreshToken,
  };

  const userTokens = await Token.findOne({ owner: payload.id });

  if (!userTokens) {
    await Token.create({ owner: payload.id, ...tokens });
  }

  if (userTokens) {
    await Token.findByIdAndUpdate(userTokens._id, tokens);
  }

  return tokens;
};

module.exports = tokenGenerator;
