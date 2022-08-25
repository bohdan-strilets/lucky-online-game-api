const { User } = require("../../models");
const { compareSync } = require("bcryptjs");
const { payloadGenerator, tokenGenerator } = require("../../helpers");

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Email is wrong.",
    });
  }

  if (!compareSync(password, user.password)) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Password is wrong.",
    });
  }

  if (!user.isVerified) {
    res.status(401).json({
      status: "error",
      code: 401,
      message: "Account not verify.",
    });
  }

  const payload = payloadGenerator(user);
  const tokens = await tokenGenerator(payload);

  res
    .cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      status: "ok",
      code: 200,
      tokens,
      user: {
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        isVerified: user.isVerified,
      },
    });
};

module.exports = signin;
