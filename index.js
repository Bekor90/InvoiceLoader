const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");

require("./src/config/config");

const app = express();
let server = http.createServer(app);
app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  
    next();
  });

//routes
  app.use(require('./src/server/routes/invoice'));
  app.use(require('./src/server/routes/weather'));


  server.listen(process.env.PORT, () => {
    console.log("Server online puerto: ", process.env.PORT);
  });