import React from 'react';
import { connect } from 'react-redux';
import RoomElement from './RoomElement';
import { getAllRooms } from '../../../store/actions/apiRequestActions/apiRoomsRequestActions';

class RoomsList extends React.Component {

    componentDidMount() {
        this.props.getAllRooms();
    }

    renderRoom = room => {
        return (
            <RoomElement
                key={room._id}
                room={room}
            />
        );
    }

    render() {
        return (
            <div className="support-list">
                {this.props.roomsStore.loading
                    ? (
                        <div className="loader">
                            <img alt="" src="/images/elements/loader.png" />
                        </div>
                    )
                    : (
                        (this.props.roomsStore !== null && this.props.roomsStore.rooms.length)
                            ? (this.props.roomsStore.rooms.map(this.renderRoom))
                            : "Вы можете создать свою комнату для общения"
                    )}
            </div>
        )
    }
}

const mapStateToProps = ({ apiRequestStore }) => ({
    roomsStore: apiRequestStore.rooms.allRooms
});

const mapActionCreators = {
    getAllRooms
};

export default connect(mapStateToProps, mapActionCreators)(RoomsList);