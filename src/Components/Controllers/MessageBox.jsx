import React from 'react';
import PropTypes from 'prop-types';
// const FontAwesome = require('react-fontawesome');
class MessageBox extends React.Component {

    scrollToBottom() {
        // this.messagesEnd.scrollIntoView({ behavior: "smooth" ,block: 'center',inline: 'center'});
        this.messagesEnd.parentNode.scrollTop = this.messagesEnd.offsetTop;
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    renderAttachment(attachment, key, direction){
    console.log(direction); //direction -> sent received
        return (
            <div key={key} id={`attachment_${key}`} className={`attachmentFiles`}>
                <p className='attachmentText'><strong>{`${attachment.name}`}</strong></p>
                <p className='attachmentText'>{`${attachment.type} - ${attachment.size}kb`}</p>
            </div>
        );
    }

    renderMessage(message, key) {
        const messageTypeClass = `message_bubble ${message.direction}`;
        console.log(message);
        console.log(message.attachment);
        return (
            <div key={key} className={`messageContainer ${messageTypeClass}`}>
                <div className={`message ${messageTypeClass}`}>
                    <p className='h7 messageText'>{`${message.content}`}</p>
                    <div className='messageAttachments'>
                        {message.attachment ? message.attachment.map((attachment, key) => this.renderAttachment(attachment, key,message.direction)) :''}
                    </div>
                </div>
                <p className='messageDate'>{`${message.date}`}</p>
            </div>
        )
    }

    render() {
        return (
            <div id="messageBox" className={`${this.props.addClass} messageBox`}>
                {this.props.messages.map((message, key) => this.renderMessage(message, key))}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }

};

MessageBox.propTypes = {
    storeChats: PropTypes.object,
};

export default MessageBox;
