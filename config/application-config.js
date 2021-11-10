const config = {
  datastore: {
    MONGO: {
      host: process.env.MONGO_HOST || "fastify-node-mongo",
      port: process.env.MONGO_PORT || 27017,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
    },
    REDIS: {
      host: process.env.REDIS_HOST || "fastify-redis",
      port: process.env.REDIS_PORT || 6379,
      sessionTTL: process.env.SESSION_TTL || 864e3,
    },
  },
};

module.exports = config;
