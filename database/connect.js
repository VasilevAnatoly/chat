var mongoose = require('mongoose');
var log = require('../server/libs/log')(module);

require('./schemas/ChatMessage');
require('./schemas/ChatRoom');

module.exports = async function (url) {
    var connect = async () => {
        mongoose.Promise = Promise;
        try {
            await mongoose.connect(url, {
                auto_reconnect: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 500,
                useNewUrlParser: true,
                poolSize: 10,
            })
        } catch (e) {
            log.error('MongoDB: connection error  ' + e)
        }
    };
    connect();

    mongoose.connection.on('error', err => {
        log.error('MongoDB: ERROR! ', err.message);
    });

    mongoose.connection.on('disconnected', connect);

    mongoose.connection.on('open', () => {
        log.info('MongoDB: Connecting successed');
    });
};