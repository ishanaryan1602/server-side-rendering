const express = require("express");
const mongoose = require("mongoose");
const router = require("./routerpath/actrouter");
const path = require("path");

const app = express();
const port = 4001;

mongoose
  .connect("mongodb://127.0.0.1:27017/urlshort")
  .then(() => console.log(`Successfully connected to MongoDB`))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.set('view engine', 'ejs');

app.set('views',path.resolve("./views"))

app.use(router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
