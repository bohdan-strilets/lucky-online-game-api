const payloadGenerator = (userData) => {
  const payload = {
    id: userData._id,
    email: userData.email,
    isVerified: userData.isVerified,
  };

  return payload;
};

module.exports = payloadGenerator;
