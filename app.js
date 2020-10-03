if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const sequelize = require("./util/db");

app.use(express.urlencoded({ extended: false }));
app.set(express.static(__dirname + "/public"));

sequelize
  .sync()
  .then((result) => {
    app.listen(8000, console.log("Listening on port 8000"));
  })
  .catch((err) => {
    console.log(err);
  });
