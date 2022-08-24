const { Schema, model } = require("mongoose");

const tokenSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const Token = model("token", tokenSchema);

module.exports = {
  Token,
};
