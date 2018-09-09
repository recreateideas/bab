import axios from 'axios';
import 'regenerator-runtime';
import {connectToSocket, storeClientInfo, disconnectSocket} from '../../tools/DBClientUtils/socketIOClientUtils';
import { dbDisconnect } from './DBClientUtils';
// import 'babel-polyfill';


// storeClientInfo('claudio');
// subscribeToTimer((err, timestamp) => console.log(timestamp));

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

const sendLoginRequest = async (e, component, validated) => {
    const userDetails = component.props.storeUser;

    if (e) e.stopPropagation();
    if (validated) {
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
            if (userFound) {
                loginUser(component, res.data.userDetails[0]._id, res.data.userDetails[0].email, res.data.userDetails[0].nickname);
                connectToSocket(component, res.data.userDetails[0]._id,res.data.userDetails[0].nickname);
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
            if (userInserted) loginUser(component, res.data._id, res.data.email, res.data.nickname);
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
