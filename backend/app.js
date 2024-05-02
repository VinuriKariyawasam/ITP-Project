const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const { readdirSync } = require("fs");
const HttpError = require("./models/http-error");
const path = require("path");
const checkAuth = require("./middleware/check-auth");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
//app.use(cors());



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'authorization, Content-Type');

  next();
});

app.use("/uploads/hr", express.static(path.join(__dirname, "uploads", "hr")));
app.use("/uploads/SM", express.static(path.join(__dirname, "uploads", "SM")));
app.use("/uploads/im", express.static(path.join(__dirname, "uploads", "im")));
app.use("/uploads/CAM", express.static(path.join(__dirname, "uploads", "CAM")));

app.use(
  "/uploads/SM/Appointment",
  express.static(path.join(__dirname, "uploads", "SM", "Appointment"))
);


// // Load finance routes
// readdirSync("./routes").map((route) =>
//   app.use("/api/finance", require("./routes/" + route))
// );

// //Load employee routes
// readdirSync("./routes").map((route) =>
//   app.use("/api/hr", require("./routes/" + route))
// );

// //Appointment
// const periodicalroute = require("./routes/appointment-routes");
// app.use("/appointment", periodicalroute);

// //Load Inventory
// readdirSync("./routes/").map((route) =>
//   app.use("/Product", require("./routes/" + route))
// );

// //CAS
// readdirSync("./routes").map((route) =>
//   app.use("/cam", require("./routes/" + route))
// );

// //Vehicle
// readdirSync("./routes").map((route) =>
//   app.use("/api/vehicle", require("./routes/" + route))
// );

// //Mobile
// readdirSync("./routes").map((route) =>
//   app.use("/api/mobile", require("./routes/" + route))
// );

// //services
// readdirSync("./routes").map((route) =>
//   app.use("/api/sm", require("./routes/" + route))
// );

// //Load customer routes

// readdirSync("./routes").map((route) =>
//   app.use("/api/customer", require("./routes/" + route))
// );




// Load finance routes
app.use("/api/finance", require("./routes/finance-routes"));

// Load employee routes
app.use("/api/hr", require("./routes/hr-routes"));

// Appointment
app.use("/appointment", require("./routes/appointment-routes"));

// Load Inventory
app.use("/Product", require("./routes/Inventory-routes"));

// CAS
app.use("/cam", require("./routes/CAM-routes"));

// Vehicle
app.use("/api/vehicle", require("./routes/vehicle-routes"));

// Mobile
app.use("/api/mobile", require("./routes/mobile-routes"));

// Services
app.use("/api/sm", require("./routes/sm-routes"));

// Load customer routes
app.use("/api/customer", require("./routes/customer-routes"));










//handle 404 errors

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
