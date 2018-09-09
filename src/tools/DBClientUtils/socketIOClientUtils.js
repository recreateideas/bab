import io from 'socket.io-client';
import 'regenerator-runtime';
import 'babel-polyfill';

let socket;

const connectToSocket = (component,customId, nickname) => {
    socket = io(`${process.env.REMOTE_HOST}:${process.env.REMOTE_SOCKET_PORT}`,{reconnection: true});
    socket.on('connect', () => {
        // console.log(socket);
        socket.emit('updateClientInfo', { customId, nickname });
        socket.emit('updateClientInfo', { customId:'123456789', nickname: 'second_test_user2' });
        socket.emit('getAllUsers');
    });
    socket.on('receiveAllUsers', (users) => {
        component.props.saveUsersToStore('allUsers',users);
    });
    socket.on('error', function(){
        socket.reconnect();
      });
};

const storeClientInfo = (customId, nickname) => {
    socket.emit('updateClientInfo', { customId, nickname });
};

const disconnectSocket = () => {
    socket.emit('disconnect');
};

const getSocket = () => {
    return socket;
};

export { connectToSocket, storeClientInfo, disconnectSocket, getSocket };
