const { validationResult } = require("express-validator");

const ValidatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("partials/errors", {
      title: "Hata",
      errors: errors.array()
    });
  }
  next();
};

module.exports = ValidatorMiddleware;
