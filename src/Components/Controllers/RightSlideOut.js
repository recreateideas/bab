import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginIFrame from './LoginIFrame';
import { mapStateToProps } from '../../store/mapToProps/mapToProps_SlideRightOut';

const FontAwesome = require('react-fontawesome');

class RightSlideOut extends Component {
    constructor(props) {
        super(props);
        this.state={
            displayIFrame: false,
        }
    }
    
    toggleIFrame(){
        const isIFrameDisplayed = this.state.displayIFrame;
        this.setState({
            displayIFrame: !isIFrameDisplayed
        });
    }

    closeLogin(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            displayIFrame: false
        });
    }

    render() {
        let hideLoggedOut = this.props.storeUser.loggedIn ? 'display_none' : '';
        let hideLoggedIn = this.props.storeUser.loggedIn ? '' : 'display_none';
        let loggedInBorder = this.props.storeUser.loggedIn ? 'loggedInBorder' : '';
        
        return (
            <div>
                <div id="rightSlideOut">
                    <div id="rightSlideOut_toggle">
                        <FontAwesome name='magic' size='2x' style={{ color: 'white', lineHeight: '2em' }} />
                    </div>
                    <div id="rightSlideOut_inner">
                        {/* [Login + Exports] */}
                        <div id='loginButton' className={`borderlessButton ${loggedInBorder}`} onClick={this.toggleIFrame.bind(this)}>
                            <FontAwesome name='users' size='3x' className={`iconButton ${hideLoggedOut}`}/>
                            <FontAwesome name='user-check' size='3x' className={`iconButton loggedInButton ${hideLoggedIn}`}/>
                        </div>
                        {/* <Button2
                            value='Check In'
                            buttonId='loginButton'
                            click={this.toggleIFrame.bind(this)}
                        /> */}
                    </div>
                </div>
                <LoginIFrame
                    display={this.state.displayIFrame}
                    closeLogin={this.closeLogin.bind(this)}
                />
            </div>
        );
    }
}


RightSlideOut.propTypes = {

};

export default connect(
    mapStateToProps,
)(RightSlideOut);
