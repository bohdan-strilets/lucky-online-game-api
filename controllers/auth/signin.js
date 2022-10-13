const { User } = require("../../models");
const { compareSync } = require("bcryptjs");
const { payloadGenerator, tokenGenerator } = require("../../helpers");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Email is wrong.",
    });
  }

  if (!compareSync(password, user.password)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Password is wrong.",
    });
  }

  if (!user.isVerified) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Account not verify.",
    });
  }

  const payload = payloadGenerator(user);
  const tokens = await tokenGenerator(payload);

  return res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    })
    .status(200)
    .json({
      status: "ok",
      code: 200,
      tokens,
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
        complexity: user.complexity,
        inGame: user.inGame,
        products: user.products,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
};

module.exports = signin;
