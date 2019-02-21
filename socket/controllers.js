var fs = require("fs");
const server = process.cwd() + '/server/';
const database = process.cwd() + '/database/';
const libs = server + 'libs/';
const log = require(libs + 'log')(module);
const schemas = database + 'schemas/'
const ChatMessage = require(schemas + 'ChatMessage');

function decodeBase64Image(dataString) {
  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let result = {};

  if (matches.length !== 3) {
    throw new Error('Invalid input string');
  }

  result.type = matches[1];
  result.data = new Buffer(matches[2], 'base64');

  return result;
}

function postMessageToRoom(data) {
  try {
    let imageExtRegEx = /\/(.*?)$/;
    let savePromises = [];
    let savedImages = [];

    data.body.images.forEach(image => {
      var imageBuffer = decodeBase64Image(image);
      var imageExtExist = imageBuffer.type.match(imageExtRegEx);
      savePromises.push(
        new Promise((resolve, reject) => {
          let webFilePath = `http://localhost:3000/uploads/images/attach/image-${Date.now()}.${imageExtExist[1]}`;
          let localFilePath = process.cwd() + `/public/uploads/images/attach/image-${Date.now()}.${imageExtExist[1]}`;
          fs.appendFile(localFilePath, imageBuffer.data, function (err) {
            if (err) {
              reject(err);
            }
            savedImages.push(webFilePath);
            resolve();
          });
        }));
    });

    Promise.all(savePromises).then(() => {
      let newMessage = new ChatMessage({
        message: data.body.message,
        room: data.body.room,
        images: savedImages
      });
      newMessage.save((err, message) => {
        if (err) {
          log.error(err.message);
        }
      });
    });
  } catch (err) {
    log.error(err.message);
  }
}

module.exports = {
  postMessageToRoom,
}