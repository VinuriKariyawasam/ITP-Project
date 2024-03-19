const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const HttpError = require("./models/http-error");
//need for file uploads
const path = require("path");

const app = express();

//running port and db url
require("dotenv").config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json()); //you can use bodyparser instead this
app.use(cors());

// Serve uploaded files statically
app.use("/uploads/hr", express.static(path.join(__dirname, "uploads", "hr")));
// Load finance routes
readdirSync("./routes").map((route) =>
  app.use("/api/finance", require("./routes/" + route))
);

// Load HR routes
readdirSync("./routes").map((route) =>
  app.use("/api/hr", require("./routes/" + route))
);

//handle 404 errors
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

//other error handeling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//DB and server connection
const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
};

server();
