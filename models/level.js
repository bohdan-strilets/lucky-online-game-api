const { Schema, model } = require("mongoose");
const joi = require("joi");

const levelSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    level: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
      enum: [
        "homeless",
        "jester",
        "beginning",
        "entrepreneur",
        "businessman",
        "deputy",
        "investor",
      ],
      default: "homeless",
    },
  },
  { versionKey: false, timestamps: true }
);

const levelJoiSchema = joi.object({
  level: joi
    .number()
    .min(1, "The only value that can be passed is '1'.")
    .max(1, "The only value that can be passed is '1'.")
    .required("The level field is required."),
});

const experienceJoiSchema = joi.object({
  experience: joi
    .number()
    .min(75, "The minimum allowed value is exactly 75.")
    .max(290, "The maximum allowed value is exactly 290.")
    .required("The experience field is required."),
});

const rankJoiSchema = joi.object({
  rank: joi
    .string()
    .valid(
      "homeless",
      "jester",
      "beginning",
      "entrepreneur",
      "businessman",
      "deputy",
      "investor"
    ),
});

const Level = model("level", levelSchema);

module.exports = {
  Level,
  levelJoiSchema,
  experienceJoiSchema,
  rankJoiSchema,
};
