const { API_URL } = process.env;

const confirmEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Email confirmation.",
    html: `
      <div>
        <h1>Welcome</h1>
        <br />
        <p>Thank you for yusing our service.</p>
        <br />
        <a target="_blank" href="${API_URL}/api/v1/user/verification/${verificationToken}">Finish registration</a>
      </div>
    `,
  };

  return mail;
};

module.exports = confirmEmail;
