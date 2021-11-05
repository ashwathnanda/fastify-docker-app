const axios = require("axios");
// Fetch Chuck Norris joke from API

const ChuckNorrisJokeController = {
  getRandomJoke: async (req, reply) => {
    try {
      const collection = req.fastify.mongo.db.collection("jokes");
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      );
      await collection.insertOne(response.data);
      reply.code(200).send(response.data);
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  },
  getJokeByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getJokeBySearch: async (req, res) => {
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/search?query=${req.params.search}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getJokeById: async (req, res) => {
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/${req.params.id}`
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllJokes: async (req, res) => {
    try {
      const collection = req.fastify.mongo.db.collection("jokes");
      const response = await collection.find().toArray();
      res.code(200).send(response);
    } catch (error) {
      res.code(500).send({ error: error.message });
    }
  },
};

module.exports = {
  ChuckNorrisJokeController,
};
