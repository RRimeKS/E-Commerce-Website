module.exports = (req, res, next) => {
    res.locals.name = req.session.name;
    res.locals.isAuth = req.session.isAuth;
    res.locals.userId = req.session.userId;
    res.locals.isAdmin = req.session.role ? req.session.role.includes("Admin") : false;
    res.locals.isModerator = req.session.role ? req.session.role.includes("Manager") : false;
    next();
}