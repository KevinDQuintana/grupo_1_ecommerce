function authMiddlware (req, res, next) {
    if (!req.session.userLogged && !req.cookies.session) {
        return res.redirect('/users/login');
    }
    return next();
}
module.exports = authMiddlware;