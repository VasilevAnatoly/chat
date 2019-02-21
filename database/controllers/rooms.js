const server = process.cwd() + '/server/';
const database = process.cwd() + '/database/';
const libs = server + 'libs/';
const schemas = database + 'schemas/'
const log = require(libs + 'log')(module);
const ChatRoom = require(schemas + 'ChatRoom');
const ChatMessage = require(schemas + 'ChatMessage');

function getAllRooms(req, res) {
    ChatRoom.find({}).lean().exec((err, rooms) => {
        if (err) {
            log.error(err.message);
            res.status(500).send(err);
        } else {
            res.status(200).send(rooms);
        }
    });
}

function getRoomMessages(req, res) {
    ChatMessage.find({
        room: req.params.id
    }).lean().exec((err, messages) => {
        if (err) {
            log.error(err.message);
            res.status(500).send(err);
        } else {
            res.status(200).send(messages);
        }
    });
}

function createRoom(req, res) {
    let newRoom = new ChatRoom(req.body);
    newRoom.save((err, room) => {
        if (err) {
            log.error(err.message);
            res.status(500).send(err);
        }
        res.status(200).send(room);
    });
}

module.exports = {
    getAllRooms,
    createRoom,
    getRoomMessages
};