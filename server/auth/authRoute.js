const router = require("express").Router();
const { registerValidation, loginValidation } = require("./validation");
const user = require("./user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  let { error } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await user.findOne({ email: req.body.email });
  if (emailExists) return res.send("email already exists");

  //hashpassword
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const User = new user({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await User.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  console.log("data:", req.body);
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const User = await user.findOne({ email: req.body.email });
  console.log(User);
  if (!User) return res.status(400).send("email does not exists");

  const validatePass = await bcrypt.compare(req.body.password, User.password);
  if (!validatePass) return res.status(400).send("invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.send(token);
});

module.exports = router;
