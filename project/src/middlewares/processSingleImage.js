const fs = require('fs/promises')
const path = require('path');
const sharp = require('sharp');

module.exports = (req, res, next) => {
	if (req.body.type === 'isProduct') {
		savePath = path.join(__dirname, '../', '../', 'uploads', 'products');
	} else {
		savePath = path.join(__dirname, '../', '../', 'uploads', 'users');
	}
	fileName = `${path.parse(req.file.filename).name}.jpg`;
	sharp(req.file.path).jpeg().toFile(path.join(savePath, fileName))
		.then(function () {
			console.log(`[INFO] image converted: ${fileName}`);
			req.file.filename = fileName;
			console.log(`[INFO] req.file.filename updated: ${req.file.filename}`)
			fs.unlink(req.file.path)
				.then(() => {
					console.log('[INFO] temp image removed successfully');
					return next(); // esta linea me jodio por 2 horas, la razon es simple, si trabajando con promesas se coloca esta linea fuera del then entonces no se espera a que se convierta la imagen, si esta dentro del then se espera a la conversion y recien se pasa al userController...
				})
				.catch(err => console.log(`[ERROR] can\'t remove image from temp folder: ${err}`))
		})
		.catch(err => {
			console.log(`[ERROR] can\'t convert image: ${err}`)
		});
}
