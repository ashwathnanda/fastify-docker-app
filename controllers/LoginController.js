const User = require("../models/Users");
const {
  comparePassword,
  encryptPassword,
  generateToken,
} = require("../util/auth");

// Controller to handle login requests
const LoginController = {
  loginUser: async (req, reply) => {
    try {
      const collection = req.fastify.mongo.db.collection("jokes");

      const { email, password } = req.body;
      const user = await collection.findOne({ email });
      if (!user) {
        return reply.code(401).send({
          status: "error",
          message: "Invalid email or password",
        });
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return reply.code(401).send({
          status: "error",
          message: "Invalid email or password",
        });
      }
      const token = await generateToken({
        id: user._id,
        email: user.email,
        role: user.role,
      });
      return reply.code(200).send({
        status: "success",
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      return reply.code(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },
  registerUser: async (req, reply) => {
    try {
      const collection = req.fastify.mongo.db.collection("users");

      const { name, email, password } = req.body;
      const user = await collection.findOne({ email });
      if (user) {
        return reply.code(409).send({
          status: "error",
          message: "User already exists",
        });
      }
      const newUser = await collection.insertOne({ name, email, password });
      const token = await generateToken({
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });
      return reply.code(201).send({
        status: "success",
        message: "User created successfully",
        token,
      });
    } catch (error) {
      return reply.code(500).send({
        status: "error",
        message: "Internal server error",
      });
    }
  },
};

module.exports = LoginController;
