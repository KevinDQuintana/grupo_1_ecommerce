const fs = require('fs/promises')
const path = require('path');
const sharp = require('sharp');

module.exports = async (req, res, next) => {
	if (req.file) {
		try {
			if (req.body.type === 'isProduct') {
				savePath = path.join(__dirname, '../', '../', 'uploads', 'products');
			} else {
				savePath = path.join(__dirname, '../', '../', 'uploads', 'users');
			}
			fileName = `${path.parse(req.file.filename).name}.jpg`;
			await sharp(req.file.path).jpeg().toFile(path.join(savePath, fileName))
			console.log(`[INFO] image converted: ${fileName}`);
			req.file.filename = fileName;
			console.log(`[INFO] req.file.filename updated: ${req.file.filename}`);
			await fs.unlink(req.file.path);
			console.log('[INFO] temp image removed successfully');
			return next();
		} catch (error) {
			console.log(`[ERROR] ${error}`);
		}
	}
}
