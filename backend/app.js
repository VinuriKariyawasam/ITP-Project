const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const HttpError = require("./models/http-error");
const path = require("path");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/uploads/hr", express.static(path.join(__dirname, "uploads", "hr")));

readdirSync("./routes").map((route) => {
  if (route.includes("finance")) {
    app.use("/finance", require("./routes/" + route));
  } else if (route.includes("hr")) {
    app.use("/api/hr", require("./routes/" + route));
  } else {
    app.use("/", require("./routes/" + route));
  }
});

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listening to port:", PORT);
  });
};

server();
