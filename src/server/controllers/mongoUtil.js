const mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    Server = mongodb.Server,
    fs = require('fs'),
    exec = require("child_process").exec;
assert = require('assert');
// http = require('http'),
// httpProxy = require('http-proxy'),
// url = require('url');

let _remoteMongoInstance, _db, _dbName, _mongoClient, _mongoPort, _hostName;

module.exports = {

    connectToDB: (params, callback) => {
        try {
            _dbName = params.connection.db;
            _hostName = params.connection.remoteHostName;
            _mongoPort = params.connection.remoteMongoPort;
            _mongoUser = params.connection.remoteMongoUser ? `${params.connection.remoteMongoUser}:` : '';
            _mongoPassword = params.connection.remoteUserPassword ? `${params.connection.remoteUserPassword}@` : '';
            _remoteMongoInstance = params.connection.remoteMongoInstance;
            const mongoUrl = `${_remoteMongoInstance}://${_mongoUser}${_mongoPassword}${_hostName}:${_mongoPort}/${_dbName}`;
            const options = {
                auto_reconnect: false,
                ssl: false,
                // SSH ??
                // sslPass: 'Oidualc2.',
                // sslKey: key,
            };
            const server = new Server(_hostName, _mongoPort, options)
            mongoConnect(server, mongoUrl, callback);
        } catch (err) {
            console.log(err);
            callback(err);
        }
    },

    getClient: () => {
        return _mongoClient;
    },

    getDB: () => {
        return _db;
    },

    getMongoPort: () => {
        return _mongoPort;
    },

    getHostName: () => {
        return _hostName;
    },

    getDBName: () => {
        return _dbName;
    }
};

const mongoConnect = (server, mongoUrl, callback) => {
    try {
        _mongoClient = MongoClient;
        _mongoClient.connect(mongoUrl, (err, client) => {
            if (client) {
                _db = client.db(_dbName);
                _mongoClient = client;
                console.log(`Connected to db...${mongoUrl}`);
            }
            if (err) console.log(err);
            return callback(err);
        });
    }
    catch (err) {
        console.log(err);
    }
};

/*
db.createUser( {
    user: "claudio",
    pwd: "Oidualc2.",
    roles: [ { role: "root", db: "admin" } ]
  }
);
*/




// const createProxy = () =>{
//     console.log('proxy');
//     const proxy = httpProxy.createProxyServer({changeOrigin: true});
//     proxy.on('proxyReq', function(proxyReq, req, res, options) {
//         proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
//         console.log(proxyReq.headers);
//       });
//     console.log(proxy);
//     const server = http.createServer((req, res)=>{
//         proxy.web(req, res, {
//             target: 'http://127.0.0.1:5060'
//         });
//         proxy.on('error', function(e) {
//             console.log(e);
//         });
//     });

//     console.log("listening on port 5050")
//     server.listen(5050);
// };

// const connectToVpn = () => {
//     var opts = {
//         host: 'wopr.cloud-iq.com.au', // normally '127.0.0.1', will default to if undefined
//         port: 443, //port openvpn management console
//         timeout: 11500, //timeout for connection - optional, will default to 1500ms if undefined
//         logpath: '/log.txt' //optional write openvpn console output to file, can be relative path or absolute
//     };
//     var auth = {
//         user: 'claudio_deangelis',
//         pass: 'physterni',
//     };

//     // var client = openvpn_client.connect(opts);

//     const conf = [fs.readFileSync(`uploads/client.ovpn`)];
//     var cmd = `openvpn --config ${conf}&`;
//     ovpnProcess = exec(cmd);

//     ovpnProcess.stdout.on('data', function(data) {
//         console.log('stdout: ' + data);
//     });

//     // var openvpn = openvpnmanager.connect(opts);

//     // console.log(openvpn);

//     // openvpn.on('connected', function() { //will be emited on successful interfacing with openvpn instance
//     //     console.log('connecting..');
//     //     const autorized = openvpnmanager.authorize(auth);
//     //     console.log(autorized);
//     // });

//     // openvpn.on('data', function(data) { //emits console output of openvpn instance as a line
//     //     console.log('DATA');
//     //     console.log(data)
//     // });

//     // openvpn.on('console-output', function(output) { //emits console output of openvpn instance as a line
//     //     console.log('OUTPUT');
//     //     console.log(output)
//     // });

//     // openvpn.on('state-change', function(state) { //emits console output of openvpn state as a array
//     //     console.log('STATE');

//     //     console.log(state)
//     // });

// };
