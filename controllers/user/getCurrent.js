const getCurrent = async (req, res) => {
  const user = req.user;

  return res.json({
    status: "ok",
    code: 200,
    user: {
      _id: user._id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      dateBirth: user.dateBirth,
      gender: user.gender,
      bank: user.bank,
      avatarURL: user.avatarURL,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};

module.exports = getCurrent;
