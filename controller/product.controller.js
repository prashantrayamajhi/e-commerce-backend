const Product = require("./../model/products");
const Category = require("./../model/category");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findById = (req, res, next) => {
  const productId = req.params.id;
  Product.findOne({ where: { id: productId } })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.save = (req, res, next) => {
  const {
    name,
    price,
    imgUrl,
    quantityInStock,
    description,
    categoryId,
  } = req.body;
  Product.create({
    name,
    price,
    imgUrl,
    quantityInStock,
    description,
    categoryId,
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateById = (req, res, next) => {
  const {
    name,
    price,
    imgUrl,
    quantityInStock,
    description,
    categoryId,
  } = req.body;
  const id = req.params.id;
  Product.findOne({
    where: {
      id,
    },
  }).then((product) => {
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    product
      .update({
        name,
        price,
        imgUrl,
        quantityInStock,
        description,
        categoryId,
      })
      .then(() => {
        res.status(201).send({ message: "Product Updated" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.deleteById = (req, res, next) => {
  const productId = req.params.id;
  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then((product) => {
      if (!product) {
        return res.json(404).send({ message: "Product not found" });
      }
      res.status(201).send({ message: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
