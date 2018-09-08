import io from 'socket.io-client';


let socket;

module.exports = {

    connectToSocket:  async ()=>{
        socket = io('http://localhost:8011');
        // console.log(socket);
        socket.on('connect',()=>{
            console.log(socket);
        });
    },
    
    subscribeToTimer: callback => {
        console.log('subscribed');
        socket.on('timer', timestamp => callback(null, timestamp));
        socket.emit('subscribeToTimer',1000);
    }
}

// export {connectToSocket, subscribeToTimer };
