import React from 'react';
import PropTypes from 'prop-types';

class UserContainer extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id={this.props.containerId} className={`${this.props.addClass} userContainer`} onClick={this.props.click}>
                <div className='connectedBadge'>
                    <div className='connectedCircle'></div>
                </div>
                <div className='userTextWrap'>
                    <p className='nicknameText h7'>{this.props.nickname}</p><br />
                    <p className='lastActiveText'>{this.props.lastActive}</p><br />
                </div>
            </div>
        )
    }
}

UserContainer.propTypes = {
    addClass: PropTypes.string,
    containerId: PropTypes.string,
    nickname: PropTypes.string,
    lastActive: PropTypes.string,
    click: PropTypes.func,
};


export default UserContainer;
