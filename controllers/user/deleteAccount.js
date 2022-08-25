const { User, Token } = require("../../models");

const deleteAccount = async (req, res) => {
  const { _id } = req.user;
  const { _id: tokenId } = await Token.findOne({ owner: _id });

  await User.findByIdAndRemove(_id);
  await Token.findByIdAndRemove(tokenId);

  return res.json({
    status: "ok",
    code: 200,
    message: "Your account and all your data has been successfully deleted.",
  });
};

module.exports = deleteAccount;
