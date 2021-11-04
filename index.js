const mongoose = require("mongoose");
const { database } = require("./config/application-config");
const dbConnection = require("./db");
const fastify = require("fastify")({
  logger: true,
});

// Constants
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
dbConnection();

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen(PORT, "0.0.0.0", function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
