const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', '../', 'uploads', 'temp'));
	},
	filename: (req, file, cb) => {
		const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
		cb(null, fileName);
		console.log(`[INFO] image stored in temp folder: ${fileName}`);
	}
});

// const upload = multer({
// 	storage,
// 	fileFilter: function (req, file, cb) {
// 		const allowedImageTypes = ['image/jpeg', 'image/png'];
// 		const isImage = allowedImageTypes.includes(file.mimetype);
// 		if (!isImage) {
// 			console.log(`[ERROR] file-type is ${file.mimetype}`);
// 			return cb(new Error('Solo se permiten archivos de imagen.'));
// 		}
// 		console.log(`[INFO] file-type is ${file.mimetype}`);
// 		return cb(null, true)
// 	}
// });
const upload = multer({ storage });

module.exports = upload;