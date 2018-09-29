import React from 'react';
import { Button2, TextBox, FileLoader } from '../BasicComponents';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const FontAwesome = require('react-fontawesome');
import { emitMessage, emitUserTyping } from '../../tools/DBClientUtils/socketIOClientUtils';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_TypeBox';
import {formatDate} from '../../tools/messageUtils';
import { handleFilesSelect } from '../../tools/fileManagers';

class TypeBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: {
                content: '',
                attachment:[],
                date: '',
                userTo: {
                    customId: '5b8b583e3b30be0bfc50f7ab',
                    nickname: 'massimilianoazzolini',
                }
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.storeUserTo){
            this.setState({
                message: {...this.state.message, userTo : Object.assign({}, nextProps.storeUserTo)}
            });
        }
    }

    typeMessage(e) {
        const content = e.target.value;
        const date = new Date();
        this.setState({
            message: { ...this.state.message, content, date: formatDate(date), }
        });
    }

    validateKeyPressed(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.sendMessage();
        } else {
            const sender = {
                customId: this.props.storeUser.ID,
                nickname: this.props.storeUser.nickName,
            }
            emitUserTyping(sender,this.props.storeUserTo);
        }
    }

    sendMessage() {
        const content = this.state.message.content;
        const attachment = this.state.attachment;
        if (content !== '' || attachment.length > 0) {
            emitMessage(this.props.storeUser.ID,this.props.storeUser.nickName,this.state.message);
        }
        this.setState({ message: { ...this.state.message, content: '', date: '', attachment:[] } });
    }

    uploadFileToSend(e){
        console.log(e.target.files[0]);
        const acceptableFileFormats=[
            '.bab','.csv','.js','.json'
        ];
        handleFilesSelect(this,e, 'resultMessage', true, (state)=>{console.log(state);},'message', acceptableFileFormats);
    }

    render() {
        return (
            <div id="typeBox" className="typeBox">

                <FileLoader
                    buttonIcon={'plus'}
                    iconClass='attachIcon'
                    addClass={'button2 attachButton'}
                    inputID={'attachButton'}
                    change={this.uploadFileToSend.bind(this)}
                    fileAccepted='.bab, .json, .csv, .js'
                    iconSize={'lg'}
                />
                <TextBox
                    content='content'
                    change={this.typeMessage.bind(this)}
                    keypress={this.validateKeyPressed.bind(this)}
                    content={this.state.message.content}
                    uploadedFiles={this.state.uploadedFiles}
                />
                <Button2
                    click={this.sendMessage.bind(this)}
                    addClass='sendButton'
                    buttonId='sendMessage'
                    value={<FontAwesome name='paper-plane' size='2x' /*spin*/ className={`sendIcon`} />}
                />
            </div>
        )
    }
};

TypeBox.propTypes = {
    storeUserTo: PropTypes.object,
    storeUser: PropTypes.object,
    pushMessageToHistory: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(TypeBox);
