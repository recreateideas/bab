import io from 'socket.io-client';
import 'regenerator-runtime';
import 'babel-polyfill';
import { findAllUsers, getMessageHistory } from './DBClientUtils';

let socket;

const connectToSocket = (component, customId, nickname) => {
    socket = connect();

    socket.on('connect', async () => {
        await findAllUsers(component);
        await getMessageHistory(component);
        socket.emit('updateClientInfo', { customId, nickname });        /* TEST --> socket.emit('updateClientInfo', { customId:'123456789', nickname: 'second_test_user2' }); */
        socket.emit('getActiveUsers');
    });

    socket.on('receiveActiveUsers', (users) => {
        component.props.saveUsersToStore('activeUsers', users);
    });

    socket.on('otherUserIsTyping', ({ customId, nickname }) => {
        console.log(`${nickname} is typing...`);
    });

    socket.on('incomingMessage', message => {
        component.props.pushMessageToHistory(message);
    });

    socket.on('error', function () {
        socket.connect();
    });
};

const connect = () => {
    socket = io(`${process.env.REMOTE_HOST}:${process.env.REMOTE_SOCKET_PORT}`, { reconnection: true });
    return socket;
};

const emitUserTyping = async (customId, nickname) => {
    socket.emit('thisUserIsTyping', { customId, nickname });
};

const emitMessage = async (senderId, senderNickname, message) => {
    // console.log(userTo);
    // console.log(`${content} : ${date}`);

    socket.emit('sendMessageToClient', { senderId, senderNickname, message });

};

const storeClientInfo = (customId, nickname) => {
    socket.emit('updateClientInfo', { customId, nickname });
};

const disconnectSocket = (component) => {
    /*** comment to text multi sockets ***/
    socket.disconnect();/*****************/
    /*************************************/
    console.log(socket);
    component.props.saveUsersToStore('activeUsers', []);
    component.props.saveUsersToStore('allUsers', []);
    // socket.emit('disconnect');
};

const getSocket = () => {
    return socket;
};


export { connectToSocket, storeClientInfo, emitUserTyping, emitMessage, disconnectSocket, getSocket };
