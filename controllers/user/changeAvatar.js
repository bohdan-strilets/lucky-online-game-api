const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const changeAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    jimp
      .read(tmpUpload)
      .then((image) => image.resize(250, 250).write(resultUpload))
      .catch((error) => console.log(error));

    fs.unlink(tmpUpload);

    const avatarURL = path.join("avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    return res.json({
      status: "ok",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = changeAvatar;
