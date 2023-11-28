const categoryRoute = require("../routes/category.route");
const productRoute = require("../routes/product.route");
const mainRoute = require("../routes/main.route");
const adminRoute = require("../routes/admin.route");
const authRoute = require("../routes/auth.route");
const userRoute = require("../routes/user.route");
const reviewRoute = require("../routes/review.route");

const mountRoutes = (app) => {
  app.use(categoryRoute);
  app.use(productRoute);
  app.use(mainRoute);
  app.use(adminRoute);
  app.use(authRoute);
  app.use(userRoute);
  app.use(reviewRoute);
};

module.exports = mountRoutes;
