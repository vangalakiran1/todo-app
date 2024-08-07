const jwt = require("jsonwebtoken");

const Authentication = async (request, response, next) => {
  let jwtToken;
  let auth = request.headers["authorization"];
  if (auth !== undefined) {
    jwtToken = auth.split(" ")[1];
  }

  if (jwtToken === undefined) {
    return response.json({ msg: "Token key requied" });
  } else {
    jwt.verify(
      jwtToken,
      process.env.JWT_SECRET_PRIVATE_KEY,
      async (error, payload) => {
        if (error) {
          return response
            .status(401)
            .json({ msg: "Invalid jwt Token", err: error });
        }
        // console.log(payload);
        request.user = payload;
        next();
      }
    );
  }
};

module.exports = Authentication;
