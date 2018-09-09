import React from 'react';
import { Button2 } from '../BasicComponents';
const FontAwesome = require('react-fontawesome');

const TypeBox = () => {
    return (
        <div id="typeBox" className="typeBox">
            <Button2
                //  click={this.Register.bind(this)}
                addClass='sendButton'
                buttonId='sendMessage'
                value={<FontAwesome name='paper-plane' size='2x' /*spin*/ className={`sendIcon`} />
            }
            />
        </div>
    )
};


export default TypeBox;
