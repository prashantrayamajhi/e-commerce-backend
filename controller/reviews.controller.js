const Review = require("./../model/reviews");

exports.findAll = (req, res, next) => {
  Review.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.findOne = (req, res, next) => {
  const id = req.params.id;
  Review.findOne({ where: { id } })
    .then((review) => {
      if (!review) {
        return res.status(404).send({ message: "Review not found" });
      }
      res.status(200).json(review);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.save = (req, res, next) => {
  const { username, rating, review, productId } = req.body;
  Review.create({
    username,
    rating,
    review,
    productId,
  })
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateById = (req, res, next) => {
  const id = req.params.id;
  const { username, rating, review } = req.body;

  Review.findOne({ where: { id } }).then((result) => {
    if (!result) {
      return res.status(404).send({ message: "Review not found" });
    }
    result
      .update({
        username,
        rating,
        review,
      })
      .then((review) => {
        res.status(201).json(review);
      })
      .catch((err) => {
        console.log(err);
        res.status(201).json(review);
      });
  });
};

exports.deleteById = (req, res, next) => {
  const id = req.params.id;

  Review.destroy({ where: { id } })
    .then((review) => {
      if (!review) {
        return res.status(404).send({ message: "Review not found" });
      }
      res.status(201).send({ message: "Review deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
