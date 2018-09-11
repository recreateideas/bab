import React from 'react';
import { Button2, TextBox } from '../BasicComponents';
import { connect } from 'react-redux';
const FontAwesome = require('react-fontawesome');
import { emitMessage, emitUserTyping } from '../../tools/DBClientUtils/socketIOClientUtils';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_TypeBox';

class TypeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: {
                content: '',
                date: '',
                userTo: {
                    customId: '5b8b583e3b30be0bfc50f7ab',
                    nickname: 'massimilianoazzolini',
                }
            }
        }
    }

    typeMessage(e) {
        const content = e.target.value;
        const date = new Date();
        this.setState({
            message: { ...this.state.message, content, date: this.formatDate(date), }
        });
    }
//"5b8b583e3b30be0bfc50f7ab
    formatDate(date) {
        return [date.getMonth() + 1,
        date.getDate(),
        date.getFullYear()].join('/') + ' ' +
            [date.getHours(),
            date.getMinutes(),
            date.getSeconds()].join(':');
    }

    validateKeyPressed(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.sendMessage();
        } else {
            emitUserTyping(this.props.storeUser.ID, this.props.storeUser.nickName);
        }
    }

    sendMessage() {
        const content = this.state.message.content;
        if (content && content !== '') {
            console.log(this.state.message);
            emitMessage(this.props.storeUser.ID,this.props.storeUser.nickName,this.state.message);
        }
        this.setState({ message: { ...this.state.message, content: '', date: '' } });
    }

    render() {
        return (
            <div id="typeBox" className="typeBox">
                <TextBox
                    content='content'
                    change={this.typeMessage.bind(this)}
                    keypress={this.validateKeyPressed.bind(this)}
                    content={this.state.message.content}
                />
                <Button2
                    click={this.sendMessage.bind(this)}
                    addClass='sendButton'
                    buttonId='sendMessage'
                    value={<FontAwesome name='paper-plane' size='2x' /*spin*/ className={`sendIcon`} />
                    }
                />
            </div>
        )
    }

};


export default connect(mapStateToProps, mapDispatchToProps)(TypeBox);
