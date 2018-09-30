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

    socket.on('otherUserIsTyping', (data) => {
        // console.log(data.sender.nickname);
        console.log(`${data.sender.nickname} is typing...`);
    });

    socket.on('incomingMessage', message => {
        console.log('MESSAGE', message);
        console.log(component);
        component.props.pushMessageToHistory('received',message);
        // console.log(component);
    });

    socket.on('messageSent', message => {
        console.log('SENT MESSAGE: ',message);
        component.props.pushMessageToHistory('sent',message);
        // console.log(component);
    });

    socket.on('disconnect', ()=>{console.log('Emit Event: disconnected')})

    socket.on('error', function () {
        socket = connect();
    });
};

const connect = () => {
    socket = io(`${process.env.REMOTE_HOST}:${process.env.REMOTE_SOCKET_PORT}`, { reconnection: true });
    return socket;
};

const emitUserTyping = (sender,receiver) => {
    socket.emit('thisUserIsTyping', {sender,receiver});
};

const emitMessage = (senderId, senderNickname, message) => {
    console.log(message);
    socket.emit('sendMessageToClient', { senderId, senderNickname, message });
};

const storeClientInfo = (customId, nickname) => {
    socket.emit('updateClientInfo', { customId, nickname });
};

const disconnectSocket = (component) => {
    /*** comment to text multi sockets ***/
    socket.disconnect();/*****************/
    /*************************************/
    // console.log(socket);
    component.props.saveUsersToStore('activeUsers', []);
    component.props.saveUsersToStore('allUsers', []);
    // socket.emit('disconnect');
};

const getSocket = () => {
    return socket;
};


export { connectToSocket, storeClientInfo, emitUserTyping, emitMessage, disconnectSocket, getSocket };
