const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const winston = require('winston');

require("./src/config/config");

const app = express();
let server = http.createServer(app);
app.use(cors());

app.use(
    bodyParser.raw({
        extended: false
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

  const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

//conection database mongoDB
 /* const conectarDB = async () => {
    try {
      await mongoose.connect(String(process.env.DB_MONGO), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      logger.info('successful database connection');
      console.log('successful database connection');
    } catch (error) {
      logger.info('error database connection');
      console.log('error database connection');
      console.log(err);
    }
  };
  conectarDB();*/


  server.listen(process.env.PORT, () => {
    console.log("Server online puerto: ", process.env.PORT);
  });