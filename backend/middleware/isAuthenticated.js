const jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
// const isAuthenticated = jwt({
//   secret: process.env.TOKEN_SECRET,
//   algorithms: ["HS256"],
//   requestProperty: "payload",
//   getToken: getTokenFromHeaders,
// });

// Function used to extracts the JWT token from the request's 'Authorization' Headers
// function getTokenFromHeaders(req) {
// Check if the token is available on the request Headers
// if (
//   req.headers.authorization &&
//   req.headers.authorization.split(" ")[0] === "Bearer"
// ) {
//   // Get the encoded token string and return it
//   const token = req.headers.authorization.split(" ")[1];
//   return token;
// }
//   if (req.headers.authorization) {
//     // Get the encoded token string and return it
//     const token = req.headers.authorization;
//     return token;
//   }

//   return null;
// }

const isAuthenticated = (req, res, next) => {
  //   const token = req.headers.authorization;
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(400).json({ message: "Token not found" });
  try {
    const tokenInfo = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(tokenInfo);
    //If you have req.payload, change line 12 to:
    //req.payload = tokenInfo;
    req.payload = tokenInfo;
    next();
  } catch (error) {
    return res.json(error);
  }
};

// Export the middleware so that we can use it to create a protected routes
module.exports = {
  isAuthenticated,
};
