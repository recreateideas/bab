import store from '../store';


const _paramsLine = {
    actives: [true],
    keys: [''],
    operators: [Object.keys(store.getState().config.operators)[0]],
    types: [Object.keys(store.getState().config.stringTypes)[0]],
    values: ['']
};

const _collectionStateTemplate = {
    isActive : true,
    preStage : '',
    params: {
        actives: [true],
        keys: [''],
        operators: [Object.keys(store.getState().config.operators)[0]],
        types: [Object.keys(store.getState().config.stringTypes)[0]],
        values: ['']
    }
};

const _stageTemplate = {
    valueTypeLeft : '"',
    valueTypeRight :'"',
    isActive: true,
    preStage: '',
    params: {
        actives: [true],
        keys: [''],
        operators: [Object.keys(store.getState().config.operators)[0]],
        types: [Object.keys(store.getState().config.stringTypes)[0]],
        values: ['']
    }
};

const _stage ={
        preParams: '',
        params: '',
        postParams: ''
};

const emptyUser = {
    loggedIn: false,
    ID:'',
    loginEmail:'',
    loginPassword:'',
    nickName: '',
    registerEmail:'',
    passWord:'',
    confirmPassWord:'',
};


export {_stage,  _collectionStateTemplate, _stageTemplate, _paramsLine, emptyUser};
