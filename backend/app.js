const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();
let PORT= process.env.PORT || 5000; // Use 5000 as default if PORT is not provided

app.use(express.json());
app.use(cors());

//Load Supervisor routes
readdirSync('./routes').map((route) =>
  app.use('/api/supervisor', require('./routes/' + route))
);


const server = () => {
  const listener = app.listen(PORT, () => {
    console.log('Listening to port: ', listener.address().port);
  });
  
  listener.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // if the port is already in use, trying the next available port
      listener.close();
      PORT++;
      server(); //call to attempt with the next port
    } else {
      console.error('Error starting server:', err);
    }
  });
};


//establish ofdatabase connection before starting the server
db();
server();
