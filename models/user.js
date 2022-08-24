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
      minLength: [4, "The minimum nickname length is 4 characters."],
      maxLength: [20, "The maximum nickname length is 20 characters."],
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
      maxLength: [12, "The maximum password length is 12 characters."],
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
  },
  { versionKey: false, timestamps: true }
);

const signupJoiSchema = joi.object({
  name: joi
    .string()
    .min(3, "The minimum name length is 3 characters.")
    .max(15, "The maximum name length is 15 characters.")
    .required("The name field is required."),
  email: joi
    .string()
    .email("Email must be in the correct format.")
    .required("The name field is required."),
  password: joi
    .string()
    .min(6, "The minimum password length is 6 characters.")
    .max(12, "The maximum password length is 12 characters.")
    .required("The password field is required."),
});

const signinJoiSchema = joi.object({
  email: joi
    .string()
    .email("Email must be in the correct format.")
    .required("The name field is required."),
  password: joi
    .string()
    .min(6, "The minimum password length is 6 characters.")
    .max(12, "The maximum password length is 12 characters.")
    .required("The password field is required."),
});

const emailJoiSchema = joi.object({
  email: joi
    .string()
    .email("Email must be in the correct format.")
    .required("The name field is required."),
});

const passwordJoiSchema = joi.object({
  password: joi
    .string()
    .min(6, "The minimum password length is 6 characters.")
    .max(12, "The maximum password length is 12 characters.")
    .required("The password field is required."),
  newPassword: joi
    .string()
    .min(6, "The minimum new password length is 6 characters.")
    .max(12, "The maximum new password length is 12 characters.")
    .required("The new password field is required."),
});

const bankJoiSchema = joi.object({
  bank: joi
    .string()
    .min(1, "The minimum value must be greater than zero.")
    .required("The bank field is required."),
});

const changeJoiSchema = joi.object({
  name: joi
    .string()
    .min(3, "The minimum name length is 3 characters.")
    .max(15, "The maximum name length is 15 characters."),
  nickname: joi
    .string()
    .min("The minimum nickname length is 4 characters.")
    .max("The maximum nickname length is 20 characters."),
  dateBirth: joi.string("The value must be in date format 'YYYY-MM-DD'"),
  gender: joi.string().valid("other", "man", "woman"),
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
};
