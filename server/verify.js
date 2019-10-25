const jwt = require("jsonwebtoken");
const path = require("path");

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  console.log("token:", token);
  if (token != undefined) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET); //token iig tulgaj uzeed verified dotor user iin id g hadgalj bui heseg buyu payload iin decrypt hiij bga
      req.user = verified; //req.user-t id g ni onooj bga
      next(); //ene ni function iig avsan eh function ii daraagiin parametr dahi function iig ajilluulna
    } catch (err) {
      res.status(400).send("Invalid Token");
    }
  } else {
    return res.status(401).render("auth");
  }
}; //its a middleware function and we can add it to routes that we want to be protected with a token
