const { getApiInstance } = require("../api");
// const crypto = require("crypto");

const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { db, username, password } = req.body;
  let psrApi = getApiInstance();
  const authMan = psrApi.authenticationManager;

  // Example to encrypt a password.
  // function encryptPassword() {
  //   const key = process.env.PASSWORD_SECRET.substr(0, 32);
  //   const iv = process.env.PASSWORD_SECRET.substr(0, 16);
  //   const cipher = crypto.createCipheriv("aes-256-ctr", key, iv);

  //   return cipher.update(password, "utf8", "hex") + cipher.final("hex");
  // }

  // Used to decrypt the password using the secret.
  // function decryptPassword() {
  //   const key = process.env.PASSWORD_SECRET.substr(0, 32);
  //   const iv = process.env.PASSWORD_SECRET.substr(0, 16);
  //   const decipher = crypto.createDecipheriv("aes-256-ctr", key, iv);

  //   return decipher.update(password, "hex", "utf8") + decipher.final("utf8");
  // }

  await authMan
    .login(db, username, password)
    .then(async () => {
      let token = jwt.sign(
        {
          session: authMan.getSession(),
          currentUser: psrApi.currentUser.Id,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json(token);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Login failed",
        error: err,
      });
    });
};

exports.get_current_user = async (req, res, next) => {
  const ouMan = req.api.organisationUnitManager;

  await ouMan
    .getOrganisationUnitUser(req.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Logout failed",
        error: err,
      });
    });
};

exports.logout = async (req, res, next) => {
  let psrApi = req.api;
  const authMan = psrApi.authenticationManager;

  await authMan
    .logout()
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(500).json({
        message: "Logout failed",
        error: err,
      });
    });
};
