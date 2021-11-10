const db = require("./storage/db");
// const redisConnection = require("./storage/redis");
const chuckNorrisRoute = require("./routes/chuckNorrisJokesRoute");
const loginRoutes = require("./routes/LoginRoute");
const swagger = require("./config/swagger");
const session = require("./storage/fastifySession");

const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("fastify-swagger"), swagger.options);
fastify.register(db);
// fastify.register(redisConnection);
fastify.register(chuckNorrisRoute);
fastify.register(loginRoutes);
fastify.register(require("fastify-bcrypt"), {
  saltWorkFactor: 12,
});

fastify.addHook("onRequest", async (request, reply) => {
  // Some code
  request.fastify = fastify;
});

// Constants
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// dbConnection();

// Run the server!
fastify.listen(PORT, "0.0.0.0", function (err, address) {
  fastify.swagger();
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
