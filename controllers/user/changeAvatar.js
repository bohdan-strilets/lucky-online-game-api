const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const cloudinary = require("cloudinary").v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const changeAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    jimp
      .read(tmpUpload)
      .then((image) => image.resize(250, 180).write(resultUpload))
      .catch((error) => console.log(error));

    fs.unlink(tmpUpload);

    const cloudinaryRes = await cloudinary.uploader.upload(
      `public/avatars/${imageName}`,
      {
        upload_preset: "dev_setups",
      }
    );

    await User.findByIdAndUpdate(req.user._id, {
      avatarURL: cloudinaryRes.url,
    });

    return res.json({
      status: "ok",
      code: 200,
      avatarURL: cloudinaryRes.url,
    });
  } catch (error) {}
};

module.exports = changeAvatar;
