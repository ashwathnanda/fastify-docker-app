const { database } = require("./config/application-config");
const mongoose = require("mongoose");

const dbConnection = () => {
  const mongoConfig = database.MONGO;
  const dbUrl = `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/?authSource=admin`;
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB Database");
  });
};

module.exports = dbConnection;
