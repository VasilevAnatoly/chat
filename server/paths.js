const path = require('path');

const publicPath = path.join(process.cwd(), '/public');
const uploadsPath = path.join(publicPath, '/uploads');
const imagesStore = path.join(uploadsPath, '/images');
const imagesAttachStore = path.join(imagesStore, '/attach');

module.exports = {
	publicPath: publicPath,
	uploadsPath: uploadsPath,
	imagesStore: imagesStore,
	imagesAttachStore: imagesAttachStore
}