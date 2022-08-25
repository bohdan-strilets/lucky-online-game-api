const { User } = require("../../models");
const { confirmEmail } = require("../../layout");
const {
  sendEmail,
  payloadGenerator,
  tokenGenerator,
} = require("../../helpers");

const path = require("path");
const { hashSync, genSaltSync } = require("bcryptjs");
const { v4 } = require("uuid");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "error",
      code: 409,
      message: `Email '${email}' in use.`,
    });
  }

  const verificationToken = v4();
  const avatarURL = path.join("avatars", "defaultAvatar.jpg");
  const hashPassword = hashSync(password, genSaltSync(10));

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const payload = payloadGenerator(result);
  const tokens = await tokenGenerator(payload);

  const mail = confirmEmail(email, verificationToken);
  await sendEmail(mail);

  res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      status: "ok",
      code: 201,
      tokens,
      user: {
        name: result.name,
        email: result.email,
        avatarURL: result.avatarURL,
        isVerified: result.isVerified,
      },
    });
};

module.exports = signup;
