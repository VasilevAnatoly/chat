import React from 'react';
import { connect } from 'react-redux';
import { connectToSocket } from 'chat/store/actions/socketActions';
import $ from 'jquery'
import Alert from './service/Alert.jsx';

class ChatApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        this.wrapper = document.querySelector('.wrapper');
    }

    componentDidMount(prevProps) {
        $('body').css('overflow', 'hidden');
        if (!this.props.onlyChild) {
            setTimeout(() => {
                this.setState({ loading: false });
                $('body').css('overflow', 'auto');
            }, 501);
        }
        this.props.connectToSocket();
    }

    componentDidUpdate(prevProps) {
        if (this.props.notifications === prevProps.notifications) {
            if (this.wrapper)
                this.wrapper.scrollTop = 0;
        }
        this.props.connectToSocket();
    }
    render() {
        if (this.props.onlyChild) {
            return this.props.children
        } else {
            return (
                <div className="wrapper">
                    {
                        this.state.loading ? (
                            <div className="loader">
                                <img src="/images/elements/loader.png" alt="" />
                            </div>
                        ) : null
                    }
                    <Alert />
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = ({ apiRequestStore }) => ({});

//Пробрасываем actions в props компонента
const mapActionCreators = {
    connectToSocket
};

export default connect(mapStateToProps, mapActionCreators)(ChatApp);