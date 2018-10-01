import axios from 'axios';
import 'regenerator-runtime';
import 'babel-polyfill';

const dbDisconnect = async (e, component) => {
    e.stopPropagation();
    console.log('disconnect');
    try {
        const res = await axios.post(`${process.env.LOCAL_HOST}:${process.env.LOCAL_PORT}/database/connection`, { connectionType: 'disconnect' })
        component.props.setConnectionParametersToStore('connectionStatus', res.data.status);
        component.props.setConnectionParametersToStore('connectionMessage', '');
        component.props.setConnectionParametersToStore('connectionWarning', res.data.warning);
        component.props.setConnectionStateToStore(res.data.isConnected);
        component.props.setCollectionConfigToStore([]);
        component.props.setCollectionToStore('');
        return res.data;
    }
    catch (err) {
        // component.throwErrors(err)
        component.props.setConnectionStateToStore(false);
    }
};

const dbConnect = async (e, component) => {
    e.stopPropagation();
    const dbConnectParams = {
        connection: component.props.storeConnection
    };
    console.log(dbConnectParams);
    try {
        const res = await axios.post(`${process.env.LOCAL_HOST}:${process.env.LOCAL_PORT}/database/connection`,
            {
                proxy: {
                    host: 'localhost',
                    port: 5001
                },
                connectionType: 'connect',
                params: dbConnectParams
            })
        const DBcollections = component.mapToArray(res.data.Collections, 'name');
        console.log(DBcollections);
        component.props.setConnectionParametersToStore('connectionStatus', res.data.status);
        component.props.setConnectionParametersToStore('connectionMessage', res.data.message);
        component.props.setConnectionParametersToStore('connectionWarning', res.data.warning);
        component.props.setCollectionConfigToStore(DBcollections);
        component.props.setCollectionToStore(DBcollections[0]);
        if (res.data) component.props.setConnectionStateToStore(res.data.isConnected);
        else component.props.setConnectionStateToStore(false);
        return res.data.Collections;
    }
    catch (err) {
        console.log(`DBCLientUtils -> dbConnect -> ${err}`);
        component.props.setConnectionStateToStore(false);
    }
};

const fetchResults = async component => {
    try{
        const db = component.props.storeDB;
        const collection = component.props.storeCollection;
        const mongo_object = component.props.storeMongoObject;
        const queryType = component.props.storeQueryType;
        if (component.props.storeDBConnected === true && db !== '') {
            const queryParams = component.props.storeQueryParams;
            const res = await axios.post(`${process.env.LOCAL_HOST}:${process.env.LOCAL_PORT}/query/`, {
                collection: collection,
                mongoObject: mongo_object,
                queryType: queryType,
                query: queryParams
            })
            console.log(res.data)
            if (res.data.Error)
                component.props.setQueryMessageToStore('queryError', res.data.Error);
            component.props.setQueryMessageToStore('queryMessage', '');
            if (res.data.results) {
                component.props.setResultsToStore(res.data.results);
                component.props.setQueryMessageToStore('queryError', '');
                component.props.setQueryMessageToStore('queryMessage', `The query has returned ${res.data.results.length} results.`);
            }
            else {
                component.props.setQueryMessageToStore('queryError', 'Something went wrong');
                component.props.setQueryMessageToStore('queryMessage', '');
            }
    
        }
    } catch(err){
      console.log(`DBCLientUtils -> fetchResults -> ${err}`);
    }
};

const updateUserField = async (payload, component) => {
    try {
        const res = await axios.post(`${process.env.REMOTE_HOST}:${process.env.REMOTE_PORT}/users/update`, payload);
        console.log(res);
    } catch(err){
        console.log(`DBCLientUtils -> updateUserField() -> Error while -> ${err}`);
    }
}

const findAllUsers = async component => {
    try {
        const res = await axios.get(`${process.env.REMOTE_HOST}:${process.env.REMOTE_PORT}/users/find/all`);
        component.props.saveUsersToStore('allUsers', res.data.users);
    }
    catch (err) {
        console.log(err);
    }
};

const getMessageHistory = async (component,userId) => {
    try {
        if(userId){
            console.log({userId});
            console.log(component);
            const res = await axios.post(`${process.env.REMOTE_HOST}:${process.env.REMOTE_PORT}/messages/find/`, {userId});
            if(res.data.messagesFound){
                // console.log(res.data);
                return res.data.messages;
            }
            return; 
        }
    }
    catch (err) {
        console.log(err);
    }
};


export { dbDisconnect, dbConnect, fetchResults, updateUserField, findAllUsers, getMessageHistory };
