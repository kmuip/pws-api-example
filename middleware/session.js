const jwt = require("jsonwebtoken");

const { getApiInstance } = require("../api");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let psrApi = getApiInstance();

    await psrApi.authenticationManager.setSession(
      decoded.session.token,
      decoded.session.userKeys
    );

    req.userId = psrApi.currentUser.Id;
    req.api = psrApi;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
