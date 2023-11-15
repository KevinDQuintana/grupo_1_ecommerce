module.exports = (req, res, next) => {
	if (req.session && req.session.user) {
		console.log('[INFO] session exists')
		res.locals.session = req.session.user;
		console.log(res.locals.session);
	} else {
		console.log('[INFO] session not exists');
		res.locals.session = null;
	}
	return next();
}