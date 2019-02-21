import MainFunctions from 'mainLibs/MainFunctions';
import OpenImage from 'chat/components/service/OpenImage';
var React = require('react');

export default class ChatMessage extends React.PureComponent {
    render() {
        const images = Array.isArray(this.props.message.images) ? this.props.message.images : [];
        const numImages = 7;
        let countImages = images.length;
        if (countImages > numImages) countImages = numImages;
        return (
            <div className="message-item">

                <div className="message-item-text">
                    {this.props.message.message}
                </div>

                <div>
                    {images.map((image, index) => {
                        if (index % numImages === 0) {
                            countImages = images.length - index;
                            if (countImages > numImages) countImages = numImages;
                        }
                        const widthImg = 100 / countImages;
                        return (
                            <OpenImage
                                key={`${image}_${index}`}
                                style={{
                                    maxHeight: '200px',
                                    maxWidth: `${widthImg}%`
                                }}
                                alt=""
                                src={image}
                            />
                        )
                    }
                    )}
                </div>

                <div className="message-date">
                    {MainFunctions.dateFormat(this.props.message.createdAt)}
                </div>

            </div>
        )
    }
}