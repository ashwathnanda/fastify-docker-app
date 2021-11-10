const fastifyPlugin = require("fastify-plugin");
const fastifyCookie = require("fastify-cookie");
const fastifySession = "@mgcrea/fastify-session";
const redis = require("ioredis");
const {
  datastore: {
    REDIS: { host, port, sessionTTL },
  },
} = require("../config/application-config");
let RedisStore = require("@mgcrea/fastify-session-redis-store");

const SESSION_TTL = sessionTTL || 864e3; // 1 day in seconds
const redisConn = new RedisStore({
  client: new redis(`redis://${host}:${port}`),
  prefix: undefined,
  ttl: SESSION_TTL,
});
const redisConnection = (fastify, _, done) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    store: redisConn,
    secret: "a secret with minimum length of 32 characters",
    cookie: { maxAge: SESSION_TTL },
  });
};

module.exports = fastifyPlugin(redisConnection);
