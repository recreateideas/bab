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
        const attachment = this.state.message.attachment;
    // console.log(attachment[0]);
        if (content !== '' || (attachment && attachment[0])) {
            console.log('send');
            emitMessage(this.props.storeUser.ID,this.props.storeUser.nickName,this.state.message);
        }
        this.setState({ message: { ...this.state.message, content: '', date: '', attachment:[] } });
    }

    uploadFileToSend(e){
        // console.log(e.target.files[0]);
        const acceptableFileFormats=[
            '.bab','.csv','.js','.json'
        ];
        handleFilesSelect(this,e, 'resultMessage', true, ()=>{},'message', acceptableFileFormats);
    }

    deleteAttachmentFile(){
        this.setState({ message: { ...this.state.message, attachment:[] } });
    }

    render() {
        const attachmentName = this.state.message.attachment && this.state.message.attachment[0] ? this.state.message.attachment[0].name : '';
        // const attachmentType = this.state.message.attachment && this.state.message.attachment[0] ? this.state.message.attachment[0].type : '';
        const attachmentSize = this.state.message.attachment && this.state.message.attachment[0] ? this.state.message.attachment[0].size : '';
        const displayAttachment = this.state.message.attachment && this.state.message.attachment.length > 0 ? 'show' : 'hidden'; 
        const displayTyping = this.props.storeUserTo.typing === true ? 'show' : 'hidden'; 
        return (
            <div id="typeBox" className="typeBox">

                <FileLoader
                    buttonIcon={'plus'}
                    iconClass='attachIcon'
                    addClass={'attachButton'}
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
                    value={<FontAwesome name='dove' /*size='2x'*/ /*spin*/ className={`sendIcon`} />}
                />
                <div id='attachmentFile' className={`${displayAttachment} attachmentFile`}>
                    <div className={`deleteAttachmentFileWrapper ${displayAttachment}`} onClick={this.deleteAttachmentFile.bind(this)}>
                        <FontAwesome className='deleteAttachmentIcon' name='times-circle' />
                    </div>
                    <p className={`h7 attachmentName`}>{`${attachmentName} - ${attachmentSize}kb`}`}</p>
                    {/* <p className={`h7 attachmentDetails`}>{`${attachmentType} - ${attachmentSize}kb`}</p> */}
                </div>
                {/* <div className={`userTyping`}><p className='typingText'>{`Tizio is typing...`}</p></div> */}
                <div className={`${displayTyping} userTyping`}><p className='h7 typingText'>{`${this.props.storeUserTo.nickname} is typing...`}</p></div>
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
