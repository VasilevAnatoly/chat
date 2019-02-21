import React from 'react';
import CreateRoomForm from './CreateRoomForm';
import RoomsList from './RoomsList';

class RoomsPage extends React.Component {

    render() {
        return (
            <div className="panel-content">
                <div className="container">
                    <div className="support">
                        <CreateRoomForm />
                        <RoomsList />
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomsPage;