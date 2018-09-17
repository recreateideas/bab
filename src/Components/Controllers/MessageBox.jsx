import React from 'react';
import PropTypes from 'prop-types';
// const FontAwesome = require('react-fontawesome');
class MessageBox extends React.Component{

    renderMessage(message,key){
        const messageTypeClass = `message_${message.direction}_bubble`;
        return (
            <div key={key} className={`message ${messageTypeClass}`}>
                <p className='h7 messageText'>{`${message.direction}, ${message.content}`}</p>
                <p className='messageDate'>{`${message.date}`}</p>
            </div>
        )
    }

    render(){
        return (
            <div id="messageBox" className={`${this.props.addClass} messageBox`}>
                {this.props.messages.map((message,key) => this.renderMessage(message,key))}
            </div>
        )
    }

};

MessageBox.propTypes = {
    storeChats: PropTypes.object,
};

export default MessageBox;
