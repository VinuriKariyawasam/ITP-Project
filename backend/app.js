const express = require('express')
const cors = require ('cors')
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const path = require("path");

const app= express()
require ('dotenv').config()
const PORT=process.env.PORT

app.use(express.json())
app.use(cors())


readdirSync('./routes').map((route) =>
  app.use('/api/finance', require('./routes/' + route))
);

readdirSync("./routes").map((route) =>
  app.use("/CAM", require("./routes/" + route))
);


const server = () =>{
    db()
    app.listen(PORT,()=>{
        console.log('Listening to port: ',PORT)
    })
}

server()