const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "omaewamoushinderu");
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  req.userId = decodedToken.userId;
  next();
};
