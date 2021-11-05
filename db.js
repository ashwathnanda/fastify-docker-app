const { database } = require("./config/application-config");
const fastifyPlugin = require("fastify-plugin");

const dbConnector = async (fastify, options) => {
  const mongoConfig = database.MONGO;
  const dbUrl = `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/?authSource=admin`;
  fastify.register(require("fastify-mongodb"), {
    url: dbUrl,
    useNewUrlParser: true,
    database: "test",
    forceClose: true,
  });
  fastify.log.info(`Connected to MongoDB`);
};

module.exports = fastifyPlugin(dbConnector);
