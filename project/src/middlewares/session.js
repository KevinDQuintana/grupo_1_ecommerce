module.exports = (req, res, next) => {
	if (req.session && req.session.user) {
		console.log('Session Exists')
		res.locals.session = req.session.user;
		console.log(res.locals.session);
	} else {
		console.log('Session Not Exists');
		res.locals.session = null;
	}
	return next();
}