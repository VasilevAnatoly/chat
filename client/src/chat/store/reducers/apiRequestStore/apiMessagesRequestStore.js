import {
    chatRequestTypes
} from '../../constants';

import {
    combineReducers
} from 'redux';

const initialMessages = {
    loading: false,
    loaded: false,
    errors: null,
    messages: [],
};

function messages(state = initialMessages, {
    type,
    data,
    errors
}) {
    switch (type) {
        case chatRequestTypes.GET_ROOM_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            }
        case chatRequestTypes.GET_ROOM_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                errors: null,
                messages: data
            }
        case chatRequestTypes.GET_ROOM_MESSAGES_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                errors: errors ? errors : null,
            }
        default:
            return state;
    }
}

const room = {
    messages
}

export default combineReducers(room);