import React from 'react';
import { connect } from 'react-redux';
import { MessageBox, UsersBox, TypeBox } from '../../../Components';
import { mapStateToProps, mapDispatchToProps } from '../../../store/mapToProps/mapToProps_ShareTab';
// const FontAwesome = require('react-fontawesome');

class ShareTab extends React.Component {

    renderMessageBoxes(){
        return (
            <MessageBox
                    
                    />
        )
    }

    render(){
        return (
            <div id="shareTab" className="tab glass">
                <div id='chatContainer'>
                    <div id='messagesAndUsers'>
                        {this.renderMessageBoxes()}
                        <TypeBox />      
                    </div>
                    <UsersBox />
                </div>
            </div>
        )
    }

};


export default connect(mapStateToProps, mapDispatchToProps)(ShareTab);
