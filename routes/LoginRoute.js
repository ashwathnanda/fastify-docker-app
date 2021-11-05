const loginController = require("../controllers/LoginController");

async function loginRoutes(fastify, _) {
  fastify.post("/login", loginController.loginUser);
  fastify.post("/register", loginController.registerUser);
}

module.exports = loginRoutes;
