const express = require("express");
const app = express();

require("dotenv").config();

const configViewEngine = require("./config/viewEngine.js");

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

const connection = require("./config/database.js");

const fileUpload = require("express-fileupload");

const { MongoClient } = require("mongodb");

// console.log('check end: ', process.env)
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
console.log(hostname);

// default options
app.use(fileUpload());

// config template engine
//config static files: img, css, js
configViewEngine(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test connection

// khai báo route
app.use("/", webRoutes);
app.use("/v1/api/", apiRoutes);

(async () => {
  try {
    //connect thanks to mongoose
    await connection();

    //connect thanks to mongodb drive
    const url = process.env.DB_HOST_WITH_DRIVE;
    const client = new MongoClient(url);

    // Database Name
    const dbName = process.env.DB_NAME;
    await client.connect();
    console.log("Connected successfully to server by mongdb driver");
    const db = client.db(dbName);
    const collection = db.collection("customers");

    // test connection & listen port
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>>Error to connect DB: ", error);
  }
})();
