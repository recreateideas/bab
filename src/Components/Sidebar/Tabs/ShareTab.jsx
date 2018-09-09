import React from 'react';
import { MessageBox, UsersBox, TypeBox } from '../../../Components';

// const FontAwesome = require('react-fontawesome');
const ShareTab = () => {
    return (
        <div id="shareTab" className="tab glass">
            <div id='chatContainer'>
                <div id='messagesAndUsers'>
                    <MessageBox />
                    <TypeBox />      
                </div>
                <UsersBox />
            </div>
        </div>
    )
};


export default ShareTab;
