import io from 'socket.io-client';
import 'regenerator-runtime';
import 'babel-polyfill';
import { findAllUsers } from './DBClientUtils';

let socket;

const connectToSocket = async (component,customId, nickname) => {
    socket = io(`${process.env.REMOTE_HOST}:${process.env.REMOTE_SOCKET_PORT}`,{reconnection: true});
    await findAllUsers(component);
    socket.on('connect', () => {
        socket.emit('updateClientInfo', { customId, nickname });
        // socket.emit('updateClientInfo', { customId:'123456789', nickname: 'second_test_user2' });
        socket.emit('getActiveUsers');
    });
    socket.on('receiveActiveUsers', (users) => {
        component.props.saveUsersToStore('activeUsers', users);
    });
    socket.on('error', function(){
        socket.reconnect();
      });
};

const storeClientInfo = (customId, nickname) => {
    socket.emit('updateClientInfo', { customId, nickname });
};

const disconnectSocket = () => {
    console.log('disconnect');
    socket.emit('disconnect');
};

const getSocket = () => {
    return socket;
};


export { connectToSocket, storeClientInfo, disconnectSocket, getSocket };
