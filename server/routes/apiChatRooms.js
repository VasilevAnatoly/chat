const express = require('express');
const database = process.cwd() + '/database/';
const controllers = require(database + 'controllers');

const rooms = controllers.rooms;

var router = express.Router();

router.route('/')
    .get(rooms.getAllRooms)
    .post(rooms.createRoom);

router.route('/:id').get(rooms.getRoomMessages);

module.exports = router;