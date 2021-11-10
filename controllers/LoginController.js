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
      const collection = req.fastify.mongo.db.collection("users");
      const { redis } = req.fastify;

      const { email, password } = req.body;
      const user = await collection.findOne({ email });
      if (!user) {
        return reply.code(401).send({
          status: "error",
          message: "Invalid email or password",
        });
      }

      if (await redis.get(user.email)) {
        return reply.code(401).send({
          status: "error",
          message: "User already logged in",
        });
      }

      const isMatch = await comparePassword(password, user.password);
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

      await redis.set(user.email, token, "EX", 30, (err, reply) => {
        if (err) {
          return reply.code(500).send({
            status: "error",
            message: "Internal server error",
          });
        }
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
        error: error.message,
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

      const hashedPassword = await encryptPassword(password);
      const newUser = await collection.insertOne({
        name,
        email,
        password: hashedPassword,
      });

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
        error: error.message,
      });
    }
  },
};

module.exports = LoginController;
