const db = require("./storage/db");
const redisConnection = require("./storage/redis");
const chuckNorrisRoute = require("./routes/chuckNorrisJokesRoute");
const loginRoutes = require("./routes/LoginRoute");
const swagger = require("./config/swagger");
const { validateRequest } = require("./util/auth");
const fastify = require("fastify")({
  logger: true,
  trustProxy: true,
});

fastify.addHook("onRequest", async (request, reply) => {
  // Some code
  request.fastify = fastify;
});

fastify.addHook("onResponse", async (request, reply) => {
  reply.header("X-Request-Id", request.id);
  reply.header("X-Hostname", request.hostname);
});

// Register Plugins
fastify.register(require("fastify-swagger"), swagger.options);
fastify.register(db);
fastify.register(redisConnection);

// Register routes
fastify.register(async (instance, opts, done) => {
  await chuckNorrisRoute(fastify);
});
fastify.register(async (instance, opts, done) => {
  await loginRoutes(fastify);
});

// Constants
const PORT = process.env.PORT || 3000;

fastify.route({
  method: "GET",
  url: "/",
  handler: async (request, reply) => {
    reply.send({
      status: "OK",
      message: "UP",
      headers: request.headers,
    });
  },
});

// Run the server!
fastify.listen(PORT, "0.0.0.0", function (err, address) {
  fastify.swagger();
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
