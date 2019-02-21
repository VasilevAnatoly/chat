import React from 'react';
import _ from 'underscore';

import {
    Image
} from 'react-bootstrap';

export default class OpenImage extends React.PureComponent {

    state = {
        open: false
    };

    closed = () => {
        if (this.props.closed) {
            this.props.closed();
        } else {
            this.setState({ open: false })
        }
    };

    opened = () => {
        if (this.props.opened) {
            this.props.opened();
        } else {
            this.setState({ open: true })
        }
    };

    remove = () => {
        this.props.remove && this.props.remove(this.props.image);
    };

    render() {
        const { style, image, attach, src, alt, open, closed, opened, remove, ...otherProps } = this.props;
        const openImg = (_.isUndefined(open) || _.isNull(open)) ? this.state.open : open;
        return (
            <div className={'chat-message-image ' + (attach ? 'attach' : '')} >

                <span className={openImg ? 'overlayd-page' : ''} onClick={this.closed}>
                    {openImg && <i className={' fa fa-3x fa-close closed-button'} />}
                </span>

                <Image
                    style={style}
                    alt={alt || ''}
                    src={src || ''}
                    onClick={this.opened}
                    {...otherProps}
                />
                {
                    attach &&
                    <div className='chat-message-img-closed-button' onClick={this.remove}>
                        <i className={'fa fa-close'} />
                    </div>
                }

                <Image
                    className={'chat-message-img ' + (openImg ? 'chat-message-img-open' : '')}
                    alt=""
                    src={src || ''}
                />
            </div>


        );
    }
}
