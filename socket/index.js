const server = process.cwd() + '/server/';
const libs = server + 'libs/';
const log = require(libs + 'log')(module);
const controllers = require('./controllers');

module.exports = (io) => {
    io.on('connection', async function (client) {
        try {
            // Прокидываем user в data, полученные данные в body
            client.use((packet, next) => {
                const data = packet[1];
                if (typeof data === 'object' && data) {
                    const body = {};
                    for (const prop in data) {
                        if (data.hasOwnProperty(prop)) {
                            body[prop] = data[prop];
                            delete data[prop];
                        }
                    }
                    data.body = body;
                }
                return next();
            });

            client.on('sendMessageToRoom', controllers.postMessageToRoom);
        } catch (e) {
            client.disconnect(true);
            log.error((e || {}).message || e);
        }
    });
    log.info(`Socket server is listening`);
}