const Product = require("./../model/products");
const Category = require("./../model/category");
const Review = require("./../model/reviews");

exports.getProducts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 13;
  let totalProducts;

  const categoryId = req.query.categoryId;

  if (categoryId) {
    Category.findByPk(categoryId).then((category) => {
      if (!category) {
        return res.status(404).send({ message: "Products not found" });
      }
      Product.findAll({ where: { categoryId } })
        .then((products) => {
          totalProducts = products.length;
          return Product.findAll({
            where: {
              categoryId,
            },
            offSet: (currentPage - 1) * perPage,
            limit: perPage,
          });
        })
        .then((products) => {
          res.status(200).json({ products, totalProducts });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    Product.findAll()
      .then((products) => {
        totalProducts = products.length;
        return Product.findAll({
          offSet: (currentPage - 1) * perPage,
          limit: perPage,
        });
      })
      .then((products) => {
        res.status(200).json({ products, totalProducts });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Product.findAll()
  //   .then((products) => {

  //     totalProducts = products.length;
  //     return Product.findAll({
  //       offSet: (currentPage - 1) * perPage,
  //       limit: perPage,
  //     });
  //   })
  //   .then((products) => {
  //     res.status(200).json({ products, totalProducts });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // if (categoryId) {
  //   Product.findAll({ where: { categoryId } })
  //     .then((products) => {
  //       if (!products) {
  //         return res.status(404).send({ message: "Products not found" });
  //       }
  //       res.status(200).json(products);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // } else {
  // Product.findAll()
  //   .then((products) => {
  //     res.status(200).json(products);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
};

exports.findById = (req, res, next) => {
  const productId = req.params.id;
  Product.findOne({ where: { id: productId }, include: Review })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      console.log(product);
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
