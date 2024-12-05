const { NotFoundError,BadRequestError, UnauthenticatedError } = require("../errors");
const Users = require("../models/Users");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    throw new BadRequestError("Name, Email and Password are required");
  }
  const user = await Users.create({ name, email, password });
  const token = await user.createJWT();
  res.status(200).json({ user: { name: user.name, email:user.email, uid:user._id, status:user.role == 'admin' ? user.role : null }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide Email and Password");
  }
  const user = await Users.findOne({ email });
  if (!user) {
    throw new BadRequestError("Please enter correct login credentials");
  }
  const passwordVerified = await user.verifyPassword(password);
  if (!passwordVerified) {
    throw new UnauthenticatedError("please enter correct login credentials");
  }
  const token = await user.createJWT();
  res.status(200).json({ user: { name: user.name, email:user.email, uid:user._id, status:user.role == 'admin' ? user.role : null }, token });
};

module.exports = { register, login };