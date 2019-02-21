import {
    chatRequestTypes,
    chatApi
} from '../../constants';

export function getRoomMessages(roomId) {
    return {
        type: chatRequestTypes.GET_ROOM_MESSAGES,
        request: {
            method: 'get',
            url: chatApi.API_URL_MESSAGES + `/${roomId}`
        },
    };
}