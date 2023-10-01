module.exports = (req, res, next) => {
	if (!req.session.user && req.cookies.session) {
		req.session.user = req.cookies.session;
		console.log('Cookie Received');
	} else {
		console.log('Cookie Not Received');
	}
	// console.log('App Level Middleware Executed')
	next();
}