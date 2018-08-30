//const  configJSON = require('../config.json');

const initialState = {
    config: require('../configuration/config.json'),
    greeting: 'baboon',
    connection: {
        isDBConnected: false,
        connectionStatus: 'Disconnected',
        remoteHostName: 'localhost',
        remoteMongoPort: '27017',
        remoteMongoInstance: 'mongodb',
        db: 'test',
        sshConnection: false,
        sshPath: '',
        sshMode: 'file'
    },
    DBcollections: [],
    collection: '',
    queryType: 'find',
    queryCollectionState: {
        stage_1: {
            isActive: true,
            preStage: '',
            params: {
                actives: [],
                keys: [],
                operators: [],
                types: [],
                values: []
            }
        }
    },
    query: {
        openQuery: '.find(',
        stages: {
            stage_1: {
                preParams: '',
                params: '',
                postParams: ''
            }
        },
        closeQuery: ')',
        cursors: {}
    },
    user:{
        loggedIn: false,
        ID:'',
        loginEmail:'',
        loginPassword:'',
        nickName: '',
        registerEmail:'',
        passWord:'',
        confirmPassWord:'',
    },
    mongo_query: '',
    mongo_object: '',
    mongo_results: [],
    queryMessage: '',
    queryError: '',
}

export default initialState;
