const {
  ChuckNorrisJokeController,
} = require("../controllers/ChuckNorrisJokeController");

async function chuckNorrisRoutes(fastify, options) {
  fastify.get("/jokes", ChuckNorrisJokeController.getRandomJoke);
  fastify.get("/jokes/all", ChuckNorrisJokeController.getAllJokes);
  fastify.get("/jokes/:category", ChuckNorrisJokeController.getJokeByCategory);
  fastify.get(
    "/jokes/search/:searchText",
    ChuckNorrisJokeController.getJokeBySearch
  );
  fastify.get("/jokes//search/:id", ChuckNorrisJokeController.getJokeById);
}

module.exports = chuckNorrisRoutes;
