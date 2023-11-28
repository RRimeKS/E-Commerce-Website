//-----== EXPRESS ==-----
const express = require("express");
const app = express();
let session = require("express-session");
let MongoDBStore = require("connect-mongodb-session")(session);

let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "E0M9HmDdE3Hag0iaNzc5Ps67PSRWqaTx",
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
      uri: "...",
      collection: "mySessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

//-----== MODULES ==-----
const dotenv = require("dotenv").config();
const path = require("path");

//-----== CUSTOM MODULES ==-----
const dbConnect = require("./config/dbConnect");
const globalError = require("./middlewares/error.middleware");
const locals = require("./middlewares/locals");
const ApiError = require("./utils/ApiError");

//route
const mountRoutes = require("./routes/index");

//-----== TEMPLATING ENGINE ==-----
app.set("view engine", "ejs");
//-----== MIDDLEWARES ==-----

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/libs", express.static(path.join(__dirname, "/node_modules")));
app.use("/static", express.static(path.join(__dirname, "/public")));

app.use(locals);

mountRoutes(app);
//-----== SERVER ==-----

//handling errors
app.all("*", (req, res, next) => {
  next(res.render("partials/errors", {
    title: "Hata",
    errors: [{ msg: "Gitmeye çalıştığınız sayfa bulunamadı!" }]
  }));
});
app.use(globalError);

//database connect
dbConnect();

//listening port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});