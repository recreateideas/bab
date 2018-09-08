import io from 'socket.io-client';


let socket;

module.exports = {

    connectToSocket: customId => {
        socket = io('http://localhost:8011');
        socket.on('connect', () => {
            console.log(socket);
            socket.emit('updateClientInfo', { customId });
        });
    },

    storeClientInfo: customId => {
        socket.emit('updateClientInfo', { customId });
    },

}

// export {connectToSocket, subscribeToTimer };
