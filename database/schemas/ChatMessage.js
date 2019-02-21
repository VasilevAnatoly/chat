var mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;

//Класс для описания тикета (обращения) в поддержку ПП
var ChatMessageModel = new Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    images: [{
        type: String,
        required: false,
    }],
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    room: {
        type: Schema.ObjectId,
        ref: "ChatRoom"
    },
});

ChatMessageModel.plugin(idvalidator);

var ChatMessage;
if (mongoose.models.ChatMessage) {
    ChatMessage = mongoose.model('ChatMessage');
} else {
    ChatMessage = mongoose.model('ChatMessage', ChatMessageModel);
}
module.exports = ChatMessage;