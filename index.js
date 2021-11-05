const db = require("./db");
const genshinRoutes = require("./routes/chuckNorrisJokesRoute");

const fastify = require("fastify")({
  logger: true,
});

fastify.register(db);
fastify.register(genshinRoutes);

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
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
