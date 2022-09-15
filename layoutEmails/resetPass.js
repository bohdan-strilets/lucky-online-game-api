const { CLIENT_URL } = process.env;

const resetPass = (email, name) => {
  const mail = {
    to: email,
    subject: "Reset password.",
    html: `
      <div>
        <h1>Hello ${name}</h1>
        <br />
        <p>Нou received this email because you are trying to recover your password to the site ${CLIENT_URL}</p>
        <br />
        <p>If you have not applied for a password reset, please ignore this email.<p/>
        <br />
        <a target="_blank" href="${CLIENT_URL}/lucky-online-game/reset-password">Restore password</a>
      </div>
    `,
  };

  return mail;
};

module.exports = resetPass;
