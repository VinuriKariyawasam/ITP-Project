const jwt = require("jsonwebtoken");

const HttpError = require("../../models/http-error");

module.exports = (req, res) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "super_secret_staff_key");
    req.userData = {
      userId: decodedToken.userId,
      email: decodedToken.email,
      empId: decodedToken.empId,
    };
    next();
  } catch (errorr) {
    res.status(401).json({ success: false, error: "authentication failed" });
  }
};
