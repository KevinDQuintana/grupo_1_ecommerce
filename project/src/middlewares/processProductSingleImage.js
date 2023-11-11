const fs = require('fs/promises')
const path = require('path');
const sharp = require ('sharp');

module.exports = (req, res, next) => {
	savePath = path.join(__dirname, '../', '../', 'uploads', 'products');
	fileName = req.file.filename;
	sharp(req.file.path).jpeg().toFile(path.join(savePath, fileName)).then(function () {
		console.log('[INFO] image converted');
		fs.unlink(req.file.path)
			.then(() => console.log('[INFO] temp image removed succesfully'))
			.catch(err => console.log(`[ERROR] can\'t remove image from temp folder: ${err}`))
	});
	next();
}
