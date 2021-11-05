const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function generateToken({ id, email, role }) {
  const payload = { id, email, role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

module.exports = {
  generateToken,
  comparePassword,
  encryptPassword,
};
