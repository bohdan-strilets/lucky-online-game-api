const { Store, User, Statistics } = require("../../models");

const buyItem = async (req, res) => {
  const { id, price } = req.body;
  const user = req.user;
  const { _id, bank } = user;

  const item = await Store.findById(id);
  const statistics = await Statistics.findOne({ owner: _id });

  if (!item) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "A product with this ID does not exist.",
    });
  }

  if (price > bank) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message:
        "There are not enough funds on your account to complete the operation.",
    });
  }

  const result = await User.findByIdAndUpdate(
    { _id },
    { $push: { products: item }, $inc: { bank: price } },
    { new: true }
  );

  await Statistics.findByIdAndUpdate(statistics._id, {
    $inc: { moneySpent: Math.abs(price) },
  });

  return res.json({
    status: "ok",
    code: 200,
    products: result.products,
    bank: result.bank,
  });
};

module.exports = buyItem;
