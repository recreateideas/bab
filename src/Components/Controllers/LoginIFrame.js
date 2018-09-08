import React from 'react';
import { connect } from 'react-redux';
import { TextInput, Button2, CheckBox } from '../BasicComponents';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_LoginIFrame';
// import { mapStateToTemplatesProps } from '../../store/mapToProps/mapToProps_DataTemplates';
// import { emptyUser } from '../../dataTemplates/collectionState';
import { dbDisconnect } from '../../tools/DBClientUtils/DBClientUtils';
import PropTypes from 'prop-types';

const FontAwesome = require('react-fontawesome');
const monkeyLogin = require('../../images/monkey_login.png');
const bananaLogin = require('../../images/banana_login.png');
const loggedInImage = require('../../images/loggedInImage.png');

class LoginIFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {
                login: {
                    loginEmail: {
                        EmailValidate: null,
                        message: ' ',
                    }
                },
                register: {
                    registerEmail: {
                        EmailValidate: null,
                        message: ' ',
                    },
                    passWord: {
                        matchingPasswords: null,
                        message: ' ',
                    }
                }
            }
        }
    }

    async sendLoginRequest(e) {
        const userDetails = this.props.storeUser;
        // console.log(userDetails);
        if(e) e.stopPropagation();
        if (this.validateLoginForSubmission() === true) {
            const loginDetails = {
                email: userDetails.loginEmail,
                password: userDetails.loginPassword
            }
            try {
                const res = await axios.post(`${process.env.REMOTE_HOST}:${process.env.REMOTE_PORT}/users/login`,
                    {
                        details: loginDetails
                    })
                console.log(res);
                // console.log(res.data.userFound);
                const userFound = res.data.userFound;
                if (userFound) this.loginUser(res.data.userDetails[0]._id,res.data.userDetails[0].email,res.data.userDetails[0].nickname);
                else this.handleLoginRejection();
            }
            catch (err) {
                console.log(err);
            }
        } else {
            console.log('form not valid');
        }
    }

    validateLoginForSubmission() {
        return this.state.validation.login.loginEmail.EmailValidate;
    }

    async sendRegisterRequest(e) {
        const userDetails = this.props.storeUser;
        e.stopPropagation();
        if (this.validateRegistrForSubmission()) {
            console.log(userDetails);
            const registerDetails = {
                nickname: userDetails.nickName,
                email: userDetails.registerEmail,
                password: userDetails.passWord,
            }
            try {
                const res = await axios.post(`${process.env.REMOTE_HOST}:${process.env.REMOTE_PORT}/users/register`,
                    {
                        details: registerDetails
                    })
                console.log(res.data);
                const userInserted = res.data.userInserted;
                if (userInserted) this.loginUser(res.data._id,res.data.email,res.data.nickname);
            }
            catch (err) {
                console.log(err);
            }
        } else {
            console.log('form not valid');
        }
    }

    handleLoginRejection() {
        console.log('rejected');
    }

    loginUser(id,email,nickname) {
        console.log('log me in');
        this.props.loginUserToStore(true);
        this.props.recordUserDetailsToStore('ID', id);
        this.props.recordUserDetailsToStore('loginEmail', email);
        this.props.recordUserDetailsToStore('nickName', nickname);
    }

    validateRegistrForSubmission() {
        return this.state.validation.register.registerEmail.EmailValidate
            && this.state.validation.register.passWord.matchingPasswords;
    }

    recordUserDetails(e) {
        // console.log(e.target.value);
        const field = e.target.id;
        const data = e.target.value;
        this.props.recordUserDetailsToStore(field, data);
    }

    validateEmail(e) {
        const email = e.target.value,
            field = e.target.id,
            emailFormat = /^[A-Za-z0-9-_.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@[A-Za-z0-9-_]+\.(([A-Za-z]+)|([A-Za-z]+\.[A-Za-z]+))$/,
            group = field.replace(/Email/, '');
        let properties = {};
        if (emailFormat.test(email)) {
            properties = {
                message: ' ',
                EmailValidate: true,
            }
        } else if (email && email !== '' && !emailFormat.test(email)) {
            properties = {
                message: '* not a valid email address',
                EmailValidate: false,
            }
        } else properties = {
            message: ' ',
            EmailValidate: null,
        }
        this.setValidationState(group, field, properties);
        this.props.recordUserDetailsToStore(field, email);
    }

    validatePassword(e) {
        const value = e.target.value,
            field = 'passWord',
            group = 'register',
            registerPassword = this.props.storeUser.passWord;
        let properties;
        if (registerPassword !== '' && value && value !== '' && value === registerPassword) {
            properties = {
                message: ' ',
                matchingPasswords: true,
            }
        } else if (registerPassword !== '' && value && value !== '' && value !== registerPassword) {
            properties = {
                message: '* passwords are not matching',
                matchingPasswords: false
            }
        } else {
            properties = {
                message: ' ',
                matchingPasswords: null,
            }
        }
        this.setValidationState(group, field, properties);
        this.recordUserDetails(e);
    }

    setValidationState(level2, level3, properties) {
        this.setState({
            validation: Object.assign({}, this.state.validation, {
                ...[level2],
                [level2]: {
                    ...this.state.validation[level2],
                    [level3]: properties
                }
            })
        })
    };

    async logOut(e) {
        // console.log('logout');
        dbDisconnect(e, this);
        this.forgetUser();
        this.props.recordUserObjectToStore(this.props._emptyUser);
        this.props.setResultsToStore([]);
        this.setValidationState('register', 'passWord', { matchingPasswords: null, message: ' ', });
        this.setValidationState('register', 'registerEmail', { EmailValidate: null, message: ' ', });
        this.setValidationState('login', 'loginEmail', { EmailValidate: null, message: ' ', });
    }

    validateClass(field) {
        return field === true ? 'validField' : field === false ? 'not_validField' : '';
    }

    isUserLoggedIn() {
        // console.log(`User Logged in: ${this.props.storeUser.loggedIn}`);
        return this.props.storeUser.loggedIn;
    }

    rememberUser() {
        const userInfo = JSON.stringify(this.props.storeUser);
        localStorage.setItem('user', userInfo);
        this.setState({ isUserRemembered: true });
    }

    forgetUser() {
        localStorage.removeItem('user');
        this.setState({ isUserRemembered: false });
    }

    isUserRemembered() {
        return localStorage.getItem('user') ? true : false;
        // return this.state.isUserRemembered;
    }

    toggleRemember() {
        if (this.isUserRemembered()) {
            console.log('forget');
            this.forgetUser();
        }
        else {
            console.log('remember');
            this.rememberUser();
        }

    }

    render() {
        const display = this.props.display === true ? 'block' : 'none';
        let displayGrid = '', displayLoggedIn = '', loggedInFrame = '';
        this.isUserLoggedIn() ? (displayGrid = 'display_none', displayLoggedIn = 'block', loggedInFrame = 'loggedInFrame') : (displayGrid = 'flexBox', displayLoggedIn = 'display_none', loggedInFrame = '');
        let displayRemember = this.isUserRemembered() ? 'display_none' : '';
        let displayForget = this.isUserRemembered() ? '' : 'display_none';
        /*** TEST ***/
        // const display = 'block';
        // let displayGrid = 'display_none', displayLoggedIn = 'block';
        // let loggedInFrame = 'loggedInFrame';
        // let displayRemember = 'block';
        // let displayForget = 'display_none';
        /********** */
        const isLoginEmailValid = this.validateClass(this.state.validation.login.loginEmail.EmailValidate);
        const isRegisterEmailValid = this.validateClass(this.state.validation.register.registerEmail.EmailValidate);
        const arePasswordsMatching = this.validateClass(this.state.validation.register.passWord.matchingPasswords);
        return (
            <div id='iframeBackdrop' style={{ display: display }} onClick={this.props.closeLogin}>
                <div id='loginiFrame' className={loggedInFrame} onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
                    <div id='closeOverlayButton' onClick={this.props.closeLogin}>
                        <FontAwesome name='times' size='2x' /*spin*/ className='closeOverlayImg' />
                    </div>
                    <Grid id='loginIFrameGrid' className={displayGrid}>
                        <Row>
                            <Col id='loginCol' className='iframeCol' xs={6} md={6}>
                                <div className='iframeColHeader'>
                                    <h4>Login</h4>
                                </div>
                                <ul>
                                    <li className='loginWelcome'>
                                        <div className='loginMessage'>
                                            <p>Welcome back chimp!</p><br />
                                        </div>
                                    </li>
                                    <li className='loginList firstLoginField'>
                                        <div className='iframeFiledImgWrap'>
                                            <div>
                                                <img src={monkeyLogin} className='monkeyLogin' />
                                            </div>
                                            <TextInput
                                                inputId={'loginEmail'}
                                                change={this.validateEmail.bind(this)}
                                                value={this.props.storeUser.loginEmail || ''}
                                                label={'your baboon login email...'}
                                                addClass={`loginFields iframeFields ${isLoginEmailValid}`}
                                            />
                                        </div>
                                    </li>
                                    <li className='validationMessage'>
                                        <div className='messageContent'>
                                            <p>{this.state.validation.login.loginEmail.message}</p>
                                        </div>
                                    </li>
                                    <li className='loginList'>
                                        <div className='iframeFiledImgWrap'>
                                            <div>
                                                <img src={bananaLogin} className='bananaLogin' />
                                            </div>
                                            <TextInput
                                                inputId={'loginPassword'}
                                                change={this.recordUserDetails.bind(this)}
                                                value={this.props.storeUser.loginPassword || ''}
                                                label={'your baboon password...'}
                                                fieldType={'password'}
                                                autoComplete='current-password'
                                                addClass='loginFields iframeFields'
                                            />
                                        </div>
                                    </li>
                                    <li className='forgotPasswordList'>
                                        <div className='forgotPassword'>
                                            <p><a href=''>forgot your Password?</a> Clumsy!</p>
                                        </div>
                                    </li>
                                    <li className='loginList loginButtonSpacer'>
                                        <Button2
                                            click={this.sendLoginRequest.bind(this)}
                                            buttonId='LoginButton'
                                            value='Login'
                                        />
                                    </li>
                                </ul>
                                {/* </div> */}
                            </Col>
                            <Col id='registerCol' className='iframeCol' xs={6} md={6}>
                                <div className='iframeColHeader'>
                                    <h4>Register</h4>
                                </div>
                                <ul>
                                    <li className='registerWelcome'>
                                        <div className='welcomeMessage'>
                                            <p>New to baboon? Sign up here for <strong>free</strong>!</p>
                                        </div>
                                    </li>
                                    <li className='registerList'>
                                        <div className='iframeFiledImgWrap'>
                                            <div className='iconWrap'>
                                                <FontAwesome name='user' size='2x' /*spin*/ className='registerFieldImg' />
                                            </div>
                                            <TextInput
                                                inputId={'nickName'}
                                                change={this.recordUserDetails.bind(this)}
                                                value={this.props.storeUser.nickName || ''}
                                                label={'nickname'}
                                                addClass='registerFields iframeFields'
                                            />
                                        </div>
                                    </li>
                                    <li className='listSpacer'>
                                        <div className='messageSpacer' />
                                    </li>
                                    <li className='registerList'>
                                        <div className='iframeFiledImgWrap'>
                                            <div className='iconWrap'>
                                                <FontAwesome name='envelope' size='2x' /*spin*/ className='registerFieldImg' />
                                            </div>
                                            <TextInput
                                                inputId={'registerEmail'}
                                                change={this.validateEmail.bind(this)}
                                                value={this.props.storeUser.registerEmail || ''}
                                                label={'email / username'}
                                                addClass={`registerFields iframeFields ${isRegisterEmailValid}`}
                                            />
                                        </div>
                                    </li>
                                    <li className='validationMessage registerMessage'>
                                        <div className='messageContent'>
                                            <p>{this.state.validation.register.registerEmail.message}</p>
                                        </div>
                                    </li>
                                    <li className='registerList'>
                                        <div className='iframeFiledImgWrap'>
                                            <div className='iconWrap'>
                                                <FontAwesome name='lock' size='2x' /*spin*/ className='registerFieldImg' />
                                            </div>
                                            <TextInput
                                                inputId={'passWord'}
                                                change={this.recordUserDetails.bind(this)}
                                                value={this.props.storeUser.passWord || ''}
                                                label={'choose your password...'}
                                                fieldType={'password'}
                                                autoComplete='current-password'
                                                addClass={`registerFields iframeFields ${arePasswordsMatching}`}
                                            />
                                        </div>
                                    </li>
                                    <li className='listSpacer'>
                                        <div className='messageSpacer' />
                                    </li>
                                    <li className='registerList'>
                                        <div className='iframeFiledImgWrap'>
                                            <div className='iconWrap' />
                                            <TextInput
                                                inputId={'confirmPassWord'}
                                                change={this.validatePassword.bind(this)}
                                                value={this.props.storeUser.confirmPassWord || ''}
                                                label={'confirm password...'}
                                                fieldType={'password'}
                                                autoComplete='current-password'
                                                addClass={`registerFields iframeFields ${arePasswordsMatching}`}
                                            />
                                        </div>
                                    </li>
                                    <li className='validationMessage registerMessage'>
                                        <div className='messageContent'>
                                            <p>{this.state.validation.register.passWord.message}</p>
                                        </div>
                                    </li>
                                    <li className='registerList registerButtonSpacer'>
                                        <Button2
                                            click={this.sendRegisterRequest.bind(this)}
                                            buttonId='registerButton'
                                            value='Register'
                                        />
                                    </li>
                                    <li className='termsAndConditionsList'>
                                        <div className='termsAndConditions'>
                                            <p>by registering you accept the <a href=''>terms and conditions</a></p>
                                        </div>
                                    </li>
                                </ul>
                                {/* </div> */}
                            </Col>
                        </Row>
                    </Grid>
                    <div className={displayLoggedIn}>
                        <Grid id='loggedInGrid'>
                            <Row id='loggedInRow'>
                                <Col xs={12} id='loggedInCol'>
                                    <ul>
                                        <li>
                                            <h4>You're Logged in as <div className='greenText'>{this.props.storeUser.nickName}</div></h4>
                                        </li>
                                        <li>
                                            <img src={loggedInImage} className='loggedInImage' />
                                        </li>

                                        <li>
                                            <div className='loginBottomButtons'>
                                                <Button2
                                                    click={this.rememberUser.bind(this)}
                                                    buttonId='RememeberButton'
                                                    value='Remember Me'
                                                    addClass={displayRemember}
                                                />
                                                <Button2
                                                    click={this.forgetUser.bind(this)}
                                                    buttonId='forgetButton'
                                                    value='Forget me'
                                                    addClass={displayForget}
                                                />
                                                <Button2
                                                    click={this.logOut.bind(this)}
                                                    buttonId='logoutButton'
                                                    value='Logout'
                                                />
                                            </div>
                                        </li>
                                        <div>
                                        </div>
                                        <li>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }

}

LoginIFrame.propTypes = {
    display: PropTypes.bool,
    closeLogin: PropTypes.func,
    storeUser: PropTypes.object,
    loginUserToStore: PropTypes.func,
    recordUserDetailsToStore: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginIFrame);
