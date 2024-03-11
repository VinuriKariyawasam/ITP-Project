const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

// Load finance routes
readdirSync("./routes").map((route) =>
  app.use("/api/finance", require("./routes/" + route))
);

// Load HR routes
readdirSync("./routes").map((route) =>
  app.use("/api/hr", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
};

server();
