const { Schema, model } = require("mongoose");
const joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required."],
      minLength: [3, "The minimum name length is 3 characters."],
      maxLength: [15, "The maximum name length is 15 characters."],
    },
    nickname: {
      type: String,
      default: "一",
    },
    email: {
      type: String,
      required: [true, "The name field is required."],
      unique: [true, "Email must be unique."],
    },
    password: {
      type: String,
      required: [true, "The password field is required."],
      minLength: [6, "The minimum password length is 6 characters."],
    },
    dateBirth: {
      type: String,
      default: "一",
    },
    gender: {
      type: String,
      enum: ["other", "man", "woman"],
      default: "other",
    },
    bank: {
      type: Number,
      default: 0,
    },
    avatarURL: {
      type: String,
      required: [true, "The avatarURL field is required."],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "The verification token field is required."],
    },
    complexity: {
      type: String,
      default: null,
    },
    inGame: {
      type: Boolean,
      default: false,
    },
    level: {
      type: Schema.Types.ObjectId,
      ref: "level",
    },
    statistics: {
      type: Schema.Types.ObjectId,
      ref: "statistics",
    },
    products: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

const signupJoiSchema = joi.object({
  name: joi.string().min(3).max(15).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(12).required(),
});

const signinJoiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(12).required(),
});

const emailJoiSchema = joi.object({
  email: joi.string().email().required(),
});

const passwordJoiSchema = joi.object({
  password: joi.string().min(6).max(12).required(),
  newPassword: joi.string().min(6).max(12).required(),
});

const bankJoiSchema = joi.object({
  bank: joi.number().required(),
});

const changeJoiSchema = joi.object({
  name: joi.string().min(3).max(15),
  nickname: joi.string().min(3).max(20),
  dateBirth: joi.string(),
  gender: joi.string().valid("other", "man", "woman"),
});

const resetPasswordJoiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).max(12).required(),
});

const complexityJoiSchema = joi.object({
  complexity: joi.string().valid("low", "medium", "high").required(),
  bank: joi.number().required(),
});

const buyItemJoiSchema = joi.object({
  id: joi.string().required(),
  price: joi.number().max(-1).required(),
});

const sellItemJoiSchema = joi.object({
  index: joi.number().min(0).required(),
  price: joi.number().min(1).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  signupJoiSchema,
  signinJoiSchema,
  emailJoiSchema,
  passwordJoiSchema,
  bankJoiSchema,
  changeJoiSchema,
  resetPasswordJoiSchema,
  complexityJoiSchema,
  buyItemJoiSchema,
  sellItemJoiSchema,
};
