import {
  chatRequestTypes,
  chatApi
} from '../../constants';

export function getAllRooms() {
  return {
    type: chatRequestTypes.GET_ALL_ROOMS,
    request: {
      method: 'get',
      url: chatApi.API_URL_ROOMS
    }
  };
}

export function getRoomMessages(roomId) {
  return {
    type: chatRequestTypes.GET_ROOM_MESSAGES,
    request: {
      method: 'get',
      url: chatApi.API_URL_ROOMS + `/${roomId}`,
    },
  };
}

export function createRoom(data) {
  return {
    type: chatRequestTypes.POST_CREATE_ROOM,
    request: {
      method: 'post',
      url: chatApi.API_URL_ROOMS,
      data: data
    },
  };
}

// export function postMessageToTicket(ticketId, data, callback) {
//   return {
//       type: affiliateRequestTypes.POST_MESSAGE_TO_TICKET,
//       request: {
//           method: 'post',
//           url: affiliateApi.API_URL_ROOMS + `/${ticketId}`,
//           data: data
//       },
//       ticketId,
//       callback
//   };
// }

// export function closeTicket(ticketId) {
//   return {
//       type: affiliateRequestTypes.CLOSE_TICKET,
//       request: {
//           method: 'delete',
//           url: affiliateApi.API_URL_TICKETS + `/${ticketId}`
//       },
//       ticketId
//   };
// }