import io from 'socket.io-client';

let socket;

const connectToSocket = customId => {
    socket = io('http://localhost:8011');
    socket.on('connect', () => {
        console.log(socket);
        socket.emit('updateClientInfo', { customId });
    });
};

const storeClientInfo = customId => {
    socket.emit('updateClientInfo', { customId });
};
const disconnectSocket = () => {
    socket.emit('disconnect');
}
const getSocket = () => {
    return socket;
};

export { connectToSocket, storeClientInfo, disconnectSocket, getSocket };
