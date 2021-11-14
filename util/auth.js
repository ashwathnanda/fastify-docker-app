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

async function validateRequest(authToken) {
  const { id, email, role } = jwt.verify(authToken, process.env.JWT_SECRET);
  return { id, email, role };
}

const validateToken = async (request, reply) => {
  const { headers } = request;
  const { authorization } = headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    const { error, payload } = await validateRequest(token);
    if (error) {
      reply.code(401).send({
        error: "Unauthorized",
      });
    } else {
      request.user = payload;
    }
  } else {
    reply.code(401).send({
      error: "AuthToken needed",
    });
  }
};

module.exports = {
  generateToken,
  comparePassword,
  encryptPassword,
  validateRequest,
  validateToken,
};
