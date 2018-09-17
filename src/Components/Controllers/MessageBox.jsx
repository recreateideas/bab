import React from 'react';
import PropTypes from 'prop-types';
// const FontAwesome = require('react-fontawesome');
class MessageBox extends React.Component {

    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" ,block: 'center',
        inline: 'center'});
        // this.messagesEnd.scrollIntoView(!0);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }


    renderMessage(message, key) {
        const messageTypeClass = `message_bubble ${message.direction}`;
        return (
            <div key={key} className={`messageContainer $${messageTypeClass}`}>
                <div className={`message ${messageTypeClass}`}>
                    <p className='h7 messageText'>{`${message.content}`}</p>
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
