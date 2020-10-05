if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");

const sequelize = require("./util/db");

// api-routes
const ProductRoute = require("./routes/products.route");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/api/products", ProductRoute);

sequelize
  .sync()
  .then((result) => {
    app.listen(8000, console.log("Listening on port 8000"));
  })
  .catch((err) => {
    console.log(err);
  });
