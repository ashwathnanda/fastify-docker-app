const {
  FastifyInstance,
  FastifyServerOptions,
  createFastify,
} = require("fastify");
const fastifyCookie = "fastify-cookie";
const RedisStore = require("@mgcrea/fastify-session-redis-store");
const fastifySession = require("@mgcrea/fastify-session");
const Redis = require("ioredis");
const {
  datastore: {
    REDIS: { host, port, sessionTTL },
  },
} = require("../config/application-config");

const SESSION_TTL = 864e3; // 1 day in seconds

const buildFastify = (options) => {
  const fastify = createFastify(options);

  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    store: new RedisStore({
      client: new Redis(`${host}:${port}`),
      ttl: SESSION_TTL,
    }),
    secret: "a secret with minimum length of 32 characters",
    cookie: { maxAge: SESSION_TTL },
  });

  return fastify;
};
