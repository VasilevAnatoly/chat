import React from 'react';
import { connect } from 'react-redux';
import { alertShow } from '../../../store/actions/alertActions';
import { createRoom } from '../../../store/actions/apiRequestActions/apiRoomsRequestActions';

class CreateRoomForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newRoomName: "",
            isInvalid: false
        }
    }

    createNewRoom = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if ((this.state.newRoomName || "").trim().length === 0) {
            this.setState({ isInvalid: true });
            this.props.alertShow("Введите название комнаты!", 'danger');
        } else {
            this.props.createRoom({ name: this.state.newRoomName });
            this.setState({ newRoomName: '' });
        }
    }

    render() {
        return (
            <div className="custom-form support-form">
                <form method="post" onSubmit={(e) => this.createNewRoom(e)}>
                    <div className="form-row">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12 form-col">
                                <div className="form-field">
                                    <input type="text" name="topic" className={this.state.isInvalid ? 'invalid' : ''} placeholder="Введите название комнаты"
                                        value={this.state.newRoomName} onChange={(e) => {
                                            this.setState({ newRoomName: e.target.value, isInvalid: false });
                                        }} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 form-col">
                                <button type="submit" className="custom-btn">
                                    Создать комнату
                            </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapActionCreators = {
    alertShow,
    createRoom
};

export default connect(null, mapActionCreators)(CreateRoomForm);