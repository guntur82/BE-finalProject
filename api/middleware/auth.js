const { tokenVerifier } = require('../helpers/jsonwebtoken');

const auth = (req, res, next) => {
  console.log('middle auth');
  // const access_token = req.headers.access_token;
  const access_token = req.headers.auth;
  console.log(access_token);
  if (access_token) {
    console.log('token ada');
    try {
      let verifyToken = tokenVerifier(access_token);
      req.userData = verifyToken;
      next();
    } catch (error) {
      res.status(401).json({
        message: `Token not authenticated!`,
      });
    }
  } else {
    res.status(404).json({
      message: `Access token not found!`,
    });
  }
};

module.exports = { auth };
