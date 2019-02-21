var mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

var ChatRoomModel = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    }
});

ChatRoomModel.plugin(idvalidator);

var ChatRoom;
if (mongoose.models.ChatRoom) {
    ChatRoom = mongoose.model('ChatRoom');
} else {
    ChatRoom = mongoose.model('ChatRoom', ChatRoomModel);
}
module.exports = ChatRoom;