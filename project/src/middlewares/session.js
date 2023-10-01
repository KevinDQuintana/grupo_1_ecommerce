module.exports = (req, res, next) => {
	if (req.session && req.session.user) {
		res.locals.session = req.session.user;
		console.log(res.locals.session);
	} else {
		res.locals.session = null;
	}
	next();
}