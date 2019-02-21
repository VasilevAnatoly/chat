let apiSocket = 'http://localhost:3000';

// ========= SOCKETS CONSTANTS BEGIN =========
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_SEND_MESSAGE = 'SOCKET_SEND_MESSAGE';
export const ADD_MESSAGE_TO_ROOM = 'ADD_MESSAGE_TO_ROOM';
export const SOCKET_URL = apiSocket;
// ========= SOCKETS CONSTANTS END =========
export const EVENT_TO_TYPE = {
	message: ADD_MESSAGE_TO_ROOM,
}