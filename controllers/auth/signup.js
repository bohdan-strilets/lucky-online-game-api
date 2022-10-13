const { User } = require("../../models");
const { confirmEmail } = require("../../layoutEmails");
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
    return res.status(409).json({
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

  return res
    .cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    })
    .status(201)
    .json({
      status: "ok",
      code: 201,
      tokens,
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
        complexity: result.complexity,
        inGame: result.inGame,
        products: result.products,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    });
};

module.exports = signup;
