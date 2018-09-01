import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button2 } from '../BasicComponents';
import PropTypes from 'prop-types';
import LoginIFrame from './LoginIFrame';
import { mapStateToProps } from '../../store/mapToProps/mapToProps_SlideRightOut';

const FontAwesome = require('react-fontawesome');

class RightSlideOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayIFrame: false,
        }
    }

    toggleIFrame() {
        const isIFrameDisplayed = this.state.displayIFrame;
        this.setState({
            displayIFrame: !isIFrameDisplayed
        });
    }

    closeLogin(e) {
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
                            <FontAwesome name='users' size='3x' className={`iconButton ${hideLoggedOut}`} />
                            <FontAwesome name='user-check' size='3x' className={`iconButton loggedInButton ${hideLoggedIn}`} />
                        </div>
                        {/* <hr className="slideSeparator" /> */}
                        <div className='toolContainer'>
                            <div className='slideOutDescriptionContainer'><p className='slideOutDescription'>font size</p></div>
                            <div id='increaseFont' className={'fontButton'} onClick={this.props.increaseFont}>
                                <h4>+</h4>
                            </div>
                            <div><p className='fontSize'>{this.props.fontSize}</p></div>
                            <div id='decreaseFont' className={'fontButton'} onClick={this.props.decreaseFont}>
                                <h4>&#8722;</h4>
                            </div>
                        </div>
                        {/* <hr className="slideSeparator" /> */}
                        <div className='toolContainer'>
                            <div className='slideOutDescriptionContainer'><p className='slideOutDescription'>tools</p></div>
                        </div>
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
    decreaseFont: PropTypes.func,
    increaseFont: PropTypes.func,
    fontSize: PropTypes.number,
};

export default connect(
    mapStateToProps,
)(RightSlideOut);
