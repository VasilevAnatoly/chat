import {
    chatRequestTypes
} from '../../constants';

import {
    combineReducers
} from 'redux';

const initialRooms = {
    loading: false,
    loaded: false,
    errors: null,
    rooms: [],
};

const initialMessages = {
    loading: false,
    loaded: false,
    errors: null,
    messages: [],
};

function allRooms(state = initialRooms, {
    type,
    data,
    errors
}) {
    switch (type) {
        case chatRequestTypes.GET_ALL_ROOMS_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
                errors: null,
            }
        case chatRequestTypes.GET_ALL_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                errors: null,
                rooms: data
            }
        case chatRequestTypes.GET_ALL_ROOMS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: true,
                errors: errors ? errors : null,
            }
        case chatRequestTypes.POST_CREATE_ROOM_REQUEST:
            return state;
        case chatRequestTypes.POST_CREATE_ROOM_SUCCESS:
            state.rooms.unshift(data);
            return {
                ...state,
                tickets: state.tickets
            }
        case chatRequestTypes.POST_CREATE_ROOM_FAIL:
            return {
                ...state,
                errors: errors ? errors : null
            }
        default:
            return state;
    }
}

function room(state = initialMessages, {
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

const rooms = {
    allRooms,
    room
}

export default combineReducers(rooms);