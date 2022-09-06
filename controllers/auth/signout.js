const { Token } = require("../../models");
const jwt = require("jsonwebtoken");

const { REFRESH_TOKEN_KEY } = process.env;

const signout = async (req, res) => {
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

  const { _id } = await Token.findOne({ refreshToken });
  await Token.findByIdAndRemove(_id);

  return res.clearCookie("refreshToken").status(204).json();
};

module.exports = signout;
