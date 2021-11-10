const fastifyPlugin = require("fastify-plugin");
const redis = require("ioredis");
const {
  datastore: {
    REDIS: { host, port },
  },
} = require("../config/application-config");

const redisConnection = (fastify, _, done) => {
  fastify.register(require("fastify-redis"), {
    client: new redis(`redis://${host}:${port}`),
    closeClient: true,
  });
  done();
};

module.exports = fastifyPlugin(redisConnection);
