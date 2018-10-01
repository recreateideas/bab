import axios from 'axios';
import 'regenerator-runtime';
import {connectToSocket, storeClientInfo, disconnectSocket} from '../../tools/DBClientUtils/socketIOClientUtils';
import { dbDisconnect,getMessageHistory } from './DBClientUtils';

// import 'babel-polyfill';

const loginUser = (component, id, email, nickname) => {
    console.log('log me in');
    component.props.loginUserToStore(true);
    component.props.recordUserDetailsToStore('ID', id);
    component.props.recordUserDetailsToStore('loginEmail', email);
    component.props.recordUserDetailsToStore('nickName', nickname);
};

const handleLoginRejection = () => {
    console.log('rejected');
};

const loginProcess = async(component,{id, email, nickname}) =>{
    loginUser(component, id, email, nickname);
    await connectToSocket(component, id, nickname);
    const messageHistory = await getMessageHistory(component, id);
    return messageHistory;
};

const sendLoginRequest = async (e, component, validated) => {
    const userDetails = component.props.storeUser;
    if (e) e.stopPropagation();
    if (validated) {
        const loginDetails = {
            email: userDetails.loginEmail,
            password: userDetails.loginPassword
        }
        try {
            const res = await axios.post(`${process.env.REMOTE_HOST}:${process.env.REMOTE_PORT}/users/login`,{details: loginDetails})
            if (res.data.userFound) {
                const userInfo = {
                    id: res.data.userDetails[0]._id,
                    email: res.data.userDetails[0].email,
                    nickname: res.data.userDetails[0].nickname,
                };
                return await loginProcess(component,userInfo);
            }
            else handleLoginRejection();
        }
        catch (err) {
            console.log(err);
        }
    } else {
        console.log('form not valid');
    }
};

const sendRegisterRequest = async (e,component, validated) => {
    const userDetails = component.props.storeUser;
    e.stopPropagation();
    if (validated) {
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
            const userInfo = {
                id: res.data._id,
                email: res.data.email,
                nickname: res.data.nickname,
            };
            // if (userInserted) loginUser(component, userInfo);
            if (userInserted) loginProcess(component,userInfo);
        }
        catch (err) {
            console.log(err);
        }
    } else {
        console.log('form not valid');
    }
};

const sendLogout = (e,component) => {
    dbDisconnect(e, component);
    disconnectSocket(component);
};

export { sendLoginRequest,sendRegisterRequest,sendLogout }
