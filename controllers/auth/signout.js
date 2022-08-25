const { Token } = require("../../models");

const signout = async (req, res) => {
  const { refreshToken } = req.cookies;

  const { _id } = await Token.findOne({ refreshToken });
  await Token.findByIdAndRemove(_id);

  res.clearCookie("refreshToken").status(204).json();
};

module.exports = signout;
