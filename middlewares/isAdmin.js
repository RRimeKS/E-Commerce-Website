module.exports = (req, res, next) => {
    if (!req.session.isAuth) {
        req.session.message = { text: "Lütfen giriş yapınız", class: "warning" }
        return res.redirect("/signin?returnUrl=" + req.originalUrl);
    }
    if (!req.session.role.includes("Admin")) {
        req.session.message = { text: "Giriş yetkiniz bulunmamaktadır", class: "danger" }
        return res.redirect("/signin?returnUrl=" + req.originalUrl);
    }
    next();

}