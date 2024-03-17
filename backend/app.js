const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000; // Default port to 3000 if PORT is not specified in .env

app.use(bodyParser.json()); // Use body-parser before other middleware
app.use(cors()); // CORS middleware

readdirSync('./routes').map((route) =>
  app.use('/finance', require('./routes/' + route))
);

const server = () => {
  db(); // Connect to the database
  app.listen(PORT, () => {
    console.log('Listening to port:', PORT);
  });
};

server();
