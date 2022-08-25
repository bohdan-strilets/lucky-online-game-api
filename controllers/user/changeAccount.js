const { User } = require("../../models");

const changeAccount = async (req, res) => {
  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

  return res.json({
    status: "ok",
    code: 200,
    user: {
      _id: result._id,
      name: result.name,
      nickname: result.nickname,
      email: result.email,
      dateBirth: result.dateBirth,
      gender: result.gender,
      bank: result.bank,
      avatarURL: result.avatarURL,
      isVerified: result.isVerified,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    },
  });
};

module.exports = changeAccount;
