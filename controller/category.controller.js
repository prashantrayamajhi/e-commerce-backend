const Category = require("./../model/category");

exports.findAll = (req, res, next) => {
  Category.findAll()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findOne = (req, res, next) => {
  const id = req.params.id;
  Category.findOne({ where: { id: id } })
    .then((category) => {
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      res.status(200).json(category);
    })
    .catch();
};

exports.save = (req, res, next) => {
  const { name } = req.body;
  Category.create({
    name,
  })
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateById = (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;

  Category.findOne({ where: { id: id } })
    .then((category) => {
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      category
        .update({
          name,
        })
        .then((category) => {
          res.status(201).json(category);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Category.destroy({ where: { id: id } })
    .then((category) => {
      if (!category) {
        return res.json(404).send({ message: "Category not found" });
      }
      res.status(201).send({ message: "Category deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
