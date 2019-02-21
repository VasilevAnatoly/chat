import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import MainFunctions from 'mainLibs/MainFunctions';

class RoomElement extends React.PureComponent {

    handleClick(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="support-item" id={"room_" + this.props.room._id}>
                <div className="support-item-header clearfix" onClick={(e) => this.handleClick(`/rooms/${this.props.room._id}`)}>
                    <div className="support-item-title">
                        {this.props.room.name}
                    </div>
                    <div className="support-item-info">
                        Создана: {MainFunctions.dateFormat(this.props.room.createdAt)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null, null)(RoomElement));