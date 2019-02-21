import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { alertActions } from '../../store/actions';

class Alert extends Component {
    componentDidMount() {
        if (this.props.open) {
            this.alertTM = setTimeout(function () {
                this.props.alertHide();
            }, 1000);
        }
    };

    componentDidUpdate() {
        var self = this;
        if (this.props.open) {
            this.alertTM = setTimeout(function () {
                self.props.alertHide();
            }, 1000);
        }
    };

    componentWillUnmount() {
        clearTimeout(this.alertTM);
    };

    handleClose = () => {
        this.props.alertHide();
    };

    render() {
        return (
            <Modal show={this.props.open} onHide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.message ? this.props.message.map(function (elem, i) {
                        return (<p key={i}>{elem}</p>)
                    }) : null}</Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
}

const mapStateToProps = ({ alertStore }) => (alertStore);

const mapActionCreators = {
    ...alertActions
};

export default connect(mapStateToProps, mapActionCreators)(Alert);