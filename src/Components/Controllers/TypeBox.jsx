import React from 'react';
import { Button2, TextBox } from '../BasicComponents';
const FontAwesome = require('react-fontawesome');

class TypeBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            message: {
                content: '',
                date:'',
            }
        }
    }

    typeMessage(e){
        const message = e.target.value;
        const date = new Date();
        this.setState({
            message:{
                content: message,
                date: this.formatDate(date),
            }
        });
    }

    formatDate(date){
        return [date.getMonth()+1,
            date.getDate(),
            date.getFullYear()].join('/')+' '+
           [date.getHours(),
            date.getMinutes(),
            date.getSeconds()].join(':');
    }

    validateKeyPressed(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            this.sendMessage();
        }
    }

    sendMessage(){
        const message = this.state.message.content;
        if(message && message !== ''){
            alert(`${message} ${this.state.message.date}`);
        }
        this.setState({message:''});
    }

    render(){
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


export default TypeBox;
