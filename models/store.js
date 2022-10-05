const { Schema, model } = require("mongoose");
const joi = require("joi");

const storeSchema = Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const itemJoiSchema = joi.object({
  price: joi.number().integer().min(1).required(),
  title: joi.string().min(3).max(40).required(),
  description: joi.string().min(20).max(400).required(),
  imageURL: joi.string().uri().required(),
});

const Store = model("store", storeSchema);

module.exports = {
  Store,
  itemJoiSchema,
};
