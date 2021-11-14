const loginController = require("../controllers/LoginController");
const { validateToken } = require("../util/auth");

async function loginRoutes(fastify, _) {
  fastify.post("/login", loginController.loginUser);
  fastify.post("/register", loginController.registerUser);
}

module.exports = loginRoutes;
