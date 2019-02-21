import {
  socketTypes
} from 'chat/store/constants';

// https://github.com/axios/axios
export function connectToSocket(actionId) {
  return {
    //тип определяющий обрабатывающий редюсер
    type: socketTypes.SOCKET_CONNECT,
  };
}

export function sendMessage(data) {
  return {
    //тип определяющий обрабатывающий редюсер
    type: socketTypes.SOCKET_SEND_MESSAGE,
    //объект socket служит для конфигурации socket.io
    socket: {
      emit: 'sendMessageToRoom',
      data: data
    }
  };
}