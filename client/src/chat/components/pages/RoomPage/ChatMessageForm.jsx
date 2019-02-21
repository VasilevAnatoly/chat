import React from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import OpenImage from 'chat/components/service/OpenImage';

import { alertShow } from '../../../store/actions/alertActions';
import { sendMessage } from 'chat/store/actions/socketActions';

import { Picker } from 'emoji-mart';

class ChatMessageForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEmojis: false,
            text: '',
            images: []
        }
    }

    sendNewMessage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if ((this.state.text || "").trim().length === 0) {
            this.props.alertShow("Введите текст сообщения!", 'danger');
        } else {
            let data = {};
            let images = [];
            data.message = this.state.text || '';
            data.room = this.props.roomId;
            for (let i = 0; i < this.state.images.length; i++) {
                images.push(this.state.images[i].imgPreviewUrl);
                console.log(this.state.images[i].imgPreviewUrl);
            }

            data.images = images;
            this.props.sendMessage(data);
        }
    };

    attachImg = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const loaded = [];
        for (let i = 0; i < e.target.files.length; i++) {
            loaded[i] = true;
            if (e.target.files[i]) {
                const img = e.target.files[i];
                let reader = new FileReader();
                loaded[i] = false;
                loaded.push(
                    new Promise((resolve, reject) => {
                        reader.onloadend = () => {
                            const images = this.state.images.slice();
                            images.push({
                                img: img,
                                imgPreviewUrl: reader.result
                            });
                            this.setState({ images });
                            resolve();
                        }
                    })
                );
                reader.readAsDataURL(img);
            };
        }
        Promise.all(loaded).then(() => this.loadImage.value = null)
    };

    removeImage = image => {
        const images = this.state.images.slice();
        const index = images.findIndex(i => i === image);
        images.splice(index, 1);
        this.setState({ images });
    };

    attachImgClick = e => {
        this.loadImage.click();
    };

    getLoadImage = ref => this.loadImage = ref;
    getMessageInput = ref => this.messageInput = ref;

    showEmojis = (e) => {
        this.setState({
            showEmojis: true
        }, () => document.addEventListener('click', this.closeMenu))
    }

    closeMenu = (e) => {
        if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
            this.setState({
                showEmojis: false
            }, () => document.removeEventListener('click', this.closeMenu))
        }
    }

    addEmoji = (e) => {
        let sym = e.unified.split('-');
        let codesArray = [];
        sym.forEach(el => codesArray.push('0x' + el));
        let emojiPic = String.fromCodePoint(...codesArray);
        this.setState({
            text: this.state.text + emojiPic
        });
    }

    render() {
        return (
            <div className="support-form">
                <div className="form-row">
                    <div className="row">

                        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12 form-col">
                            <div className="form-field">
                                <input
                                    value={this.state.text}
                                    onChange={(e) => {
                                        this.setState({ text: e.target.value });
                                    }}
                                    type="text"
                                    name="message"
                                    placeholder="Введите сообщение"
                                />
                            </div>
                            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                {this.state.images.map((image, index) => {
                                    return (
                                        <OpenImage
                                            key={`${image.imgPreviewUrl}_${index}`}
                                            style={{
                                                maxHeight: '145px',
                                            }}
                                            alt=""
                                            src={image.imgPreviewUrl}
                                            attach
                                            remove={() => this.removeImage(image)}
                                        />
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-8 form-col">
                            {
                                this.state.showEmojis ?
                                    <span style={styles.emojiPicker} ref={el => (this.emojiPicker = el)}>
                                        <Picker onSelect={this.addEmoji} />
                                    </span>
                                    :
                                    <p style={styles.getEmojiButton} onClick={this.showEmojis} >
                                        {String.fromCodePoint(0x1f60a)}
                                    </p>
                            }
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-8 form-col">
                            <button className="custom-btn" onClick={this.sendNewMessage} >
                                Отправить
                            </button>
                        </div>

                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-4 form-col">
                            <button className="custom-btn" onClick={this.attachImgClick}>
                                <i className='fa fa-download' />
                                <FormControl
                                    inputRef={this.getLoadImage}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    style={{ display: 'none' }}
                                    onChange={this.attachImg}
                                    multiple
                                />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    getEmojiButton: {
        cssFloat: 'right',
        border: 'none',
        margin: 0,
        cursor: 'pointer',
    },
    emojiPicker: {
        position: 'absolute',
        top: 10,
        right: 0,
        cssFloat: 'right',
    }
}


const mapActionCreators = {
    alertShow,
    sendMessage
}

export default connect(null, mapActionCreators)(ChatMessageForm);