import {
    combineReducers
} from 'redux';
// import room from './apiMessagesRequestStore';
import rooms from './apiRoomsRequestStore';

const apiRequestStore = {
    rooms,
    // room
}

export default combineReducers(apiRequestStore)