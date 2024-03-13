const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");

const app = express();
const path = require("path"); // Add this line

require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "/backend/uploads")));

//app.use((err, req, res, next) => {
//console.error(err.stack);
//res.status(500).send("Something went wrong!");
//});

/*/ Load finance routes
readdirSync("./routes").map((route) =>
  app.use("/api/finance", require("./routes/" + route))
);

// Load HR routes
readdirSync("./routes").map((route) =>
  app.use("/api/hr", require("./routes/" + route))
);*/

// Load Vehicle routes
readdirSync("./routes").map((route) =>
  app.use("/api/vehicle", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
};

server();