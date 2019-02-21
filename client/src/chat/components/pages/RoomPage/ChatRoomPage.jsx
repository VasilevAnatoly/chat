import React from 'react';
import { connect } from 'react-redux';
import ChatMessageForm from './ChatMessageForm';
import ChatMessage from './ChatMessage';

import { getRoomMessages } from '../../../store/actions/apiRequestActions/apiRoomsRequestActions';

class ChatRoomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: window.location.pathname.slice(window.location.pathname.indexOf('rooms/') + 6),
        }
    };

    componentDidMount() {
        this.props.getRoomMessages(this.state.id);
    };

    renderChatMessage = (message, index) => {
        return (
            <ChatMessage
                key={(message._id ? message._id : message.message) + index}
                message={message}
            />
        );
    }

    render() {
        return (
            <div className="panel-content">
                <div className="container">
                    <div className="support">
                        <div className="support-item" id={"room_" + this.state.id}>
                            <div className="support-item-detail">
                                <div className="support-messages">
                                    {this.props.messagesStore.messages.map(this.renderChatMessage)}
                                </div>
                                <ChatMessageForm
                                    roomId={this.state.id}
                                    onAddMessage={this.addMessage}
                                />
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ apiRequestStore }) => ({
    messagesStore: apiRequestStore.rooms.room
});

const mapActionCreators = {
    getRoomMessages
};

export default connect(mapStateToProps, mapActionCreators)(ChatRoomPage);