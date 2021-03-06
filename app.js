if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");

const sequelize = require("./util/db");

// models
const Product = require("./model/products");
const Category = require("./model/category");
const Review = require("./model/reviews");

// api-routes
const ProductRoute = require("./routes/products.route");
const CategoryRoute = require("./routes/category.route");
const ReviewRoute = require("./routes/reviews.route");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/api/products", ProductRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/reviews", ReviewRoute);

Product.belongsTo(Category);
Product.hasMany(Review);

sequelize
  .sync()
  .then(() => {
    app.listen(8000, console.log("Listening on port 8000"));
  })
  .catch((err) => {
    console.log(err);
  });
