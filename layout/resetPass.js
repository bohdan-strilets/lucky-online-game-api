const { API_URL } = process.env;

const resetPass = (email, name) => {
  const mail = {
    to: email,
    subject: "Reset password.",
    html: `
      <div>
        <h1>Hello ${name}</h1>
        <br />
        <p>Нou received this email because you are trying to recover your password to the site ${API_URL}</p>
        <br />
        <p>If you have not applied for a password reset, please ignore this email.<p/>
        <br />
        <a target="_blank" href="${API_URL}/api/v1/user/verification/${verificationToken}">Restore password</a>
      </div>
    `,
  };

  return mail;
};

module.exports = resetPass;
