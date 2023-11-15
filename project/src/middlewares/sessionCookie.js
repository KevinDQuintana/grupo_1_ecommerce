module.exports = (req, res, next) => {
	if (!req.session.user && req.cookies.session) {
		req.session.user = req.cookies.session;
		console.log('[INFO] cookie received');
	} else {
		console.log('[INFO] cookie not received');
	}
	return next();
}