const { User } = require("../../models");

const sellItem = async (req, res) => {
  const { _id } = req.user;
  const { index, price } = req.body;

  const user = await User.findById(_id);
  const products = user.products;

  products.splice(index, 1);
  const result = await User.findByIdAndUpdate(
    { _id },
    { products, $inc: { bank: price } },
    { new: true }
  );

  return res.json({
    status: "ok",
    code: 200,
    products: result.products,
    bank: result.bank,
  });
};

module.exports = sellItem;
