module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        req.session.message = { text: "Lütfen giriş yapınız", class: "danger" }
        return res.redirect("/signin?returnUrl=" + req.originalUrl);
    }
    next();
}