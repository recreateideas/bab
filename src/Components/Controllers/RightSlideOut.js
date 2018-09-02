import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Button2 } from '../BasicComponents';
import PropTypes from 'prop-types';
import LoginIFrame from './LoginIFrame';
import { mapStateToProps } from '../../store/mapToProps/mapToProps_SlideRightOut';
import { downloadFile, saveResultsToCSV } from '../../tools/fileManagers';
import { Tooltip } from '../BasicComponents';
import {showTooltip, hideTooltip } from '../../tools/tooltipUtils';

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

    saveQuery() {
        let fullState = this.props.storeAllState;
        const fileContent = this.prepareStateForExport(fullState);
        downloadFile({
            content: fileContent,
            extension: 'bab',
            filename: `baboon_query${+new Date()}.bab`
        });
        // console.log(fileContent);
    }

    prepareStateForExport(fullState) {
        if (fullState) {
            // delete fullState.config;
            delete fullState.greeting;
            delete fullState.isDBConnected;
            delete fullState.DBcollections;
            delete fullState.connectionMessage;
            delete fullState.db;
            delete fullState.mongo_results;
            delete fullState.user;
            return JSON.stringify(fullState);
        }
    };

    checkResultsLength() {
        const mongo_results = this.props.storeQueryResults;
        if (mongo_results && mongo_results.length > 0) {
            return {
                activeFont: '',
                activeExport: '',
                activeQuerySave: '',
                activeShare: '',
            }
        } else {
            return {
                activeFont: 'inactiveButtonIcon',
                activeExport: 'inactiveButtonIcon',
                activeQuerySave: 'inactiveButtonIcon',
                activeShare: 'inactiveButtonIcon',
            }
        }
        /******** TEST *********/
        // return {
        //     activeFont: '',
        //     activeExport: '',
        //     activeQuerySave: '',
        //     activeShare: '',
        // }
        /***********************/
    }

    saveResults() {
        saveResultsToCSV(this.props.storeQueryResults);
    }

    showTooltip(e){
        showTooltip(e.target.id,this);
    }

    hideTooltip(e){
        hideTooltip(e.target.id,this);
    }

    render() {
        let hideLoggedOut = this.props.storeUser.loggedIn ? 'display_none' : '';
        let hideLoggedIn = this.props.storeUser.loggedIn ? '' : 'display_none';
        let loggedInBorder = this.props.storeUser.loggedIn ? 'loggedInBorder' : '';
        const activeToolsClass = this.checkResultsLength();
        // console.log(this.checkResultsLength());
        return (
            <div>
                <div id="rightSlideOut">
                    <div id="rightSlideOut_toggle">
                        <FontAwesome name='magic' size='2x' style={{ color: 'white', lineHeight: '2em' }} />
                    </div>
                    <div id="rightSlideOut_inner">
                        {/* [Login + Exports] */}
                        <ul id='userPanel'>
                            <li>
                                <div id='loginButton' className={`borderlessButton ${loggedInBorder}`} onClick={this.toggleIFrame.bind(this)}>
                                    <FontAwesome name='users' size='3x' className={`iconButton ${hideLoggedOut}`} />
                                    <FontAwesome name='user-check' size='3x' className={`iconButton loggedInButton ${hideLoggedIn}`} />
                                </div>
                            </li>
                            <li>
                                <div id='nicknameWrapper' className={`${hideLoggedIn}`}>
                                    <p id='nickname'>{this.props.storeUser.nickName}</p>
                                </div>
                            </li>
                        </ul>
                        <hr className="slideSeparator" />
                        <div id='fontSizeControls' className='toolContainer'>
                            <div className='slideOutDescriptionContainer'><p className='slideOutDescription'>font size</p></div>
                            <div id='increaseFont' onClick={activeToolsClass.activeFont === '' ? this.props.increaseFont : null}>
                                <h4 className={`fontButton ${activeToolsClass.activeFont}`}>+</h4>
                            </div>
                            <div><p className={`fontSize ${activeToolsClass.activeFont}`}>{this.props.fontSize}</p></div>
                            <div id='decreaseFont' onClick={activeToolsClass.activeFont === '' ? this.props.decreaseFont : null}>
                                <h4 className={`fontButton ${activeToolsClass.activeFont}`}>&#8722;</h4>
                            </div>
                        </div>
                        {/* <hr className="slideSeparator" /> */}
                        <div id='quickTools' className='toolContainer'>
                            <div className='slideOutDescriptionContainer'><p className='slideOutDescription'>tools</p></div>
                            <ul id='quickToolsList'>
                                <li id='saveResults' onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                                    <FontAwesome name='file-export' size='2x' className={`iconButton ${activeToolsClass.activeQuerySave}`} onClick={this.saveResults.bind(this)} />
                                    <Tooltip
                                        tooltipContainerClass='tooltipContainerClass'
                                        addClass='generalTooltip rightTooltip quicktools'
                                        displayTooltip={this.state.display_saveResults_tooltip|| 'hidden'}
                                        content={`export results to CSV`}
                                    />
                                </li>
                                <li id='saveQuery' onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                                    <FontAwesome name='save' size='2x' className={`iconButton ${activeToolsClass.activeExport}`} onClick={this.saveQuery.bind(this)} />
                                    <Tooltip
                                        tooltipContainerClass='tooltipContainerClass'
                                        addClass='generalTooltip rightTooltip quicktools ${}'
                                        displayTooltip={this.state.display_saveQuery_tooltip|| 'hidden'}
                                        content={`save query to file`}
                                    />
                                </li>
                                <li id='shareWorkspace' onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>
                                    <FontAwesome name='share-alt' size='2x' className={`iconButton ${activeToolsClass.activeShare}`} />
                                    <Tooltip
                                        tooltipContainerClass='tooltipContainerClass'
                                        addClass='generalTooltip rightTooltip quicktools'
                                        displayTooltip={this.state.display_shareWorkspace_tooltip|| 'hidden'}
                                        content={`share workspace`}
                                    />
                                </li>
                            </ul>
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
