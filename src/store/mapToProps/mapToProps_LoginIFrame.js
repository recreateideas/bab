import constants from '../constants';
import store from '../../store';

const mapStateToProps = (state) => {
    // console.log('@@ CURSOR -> mapStateToProps');
    return {
        storeConnection: state.connection,
        storeUser: state.user,
        _emptyUser: {
            loggedIn: false,
            ID:'',
            loginEmail:'',
            loginPassword:'',
            nickName: '',
            registerEmail:'',
            passWord:'',
            confirmPassWord:'',
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recordUserDetailsToStore: (field, data) => {
            const action = {
                type: constants.RECORD_USER_DETAILS,
                field,
                data
            }
            dispatch(action)
        },
        recordUserObjectToStore: (user) => {
            const action = {
                type: constants.RECORD_USER_OBJECT,
                user,
            }
            dispatch(action)
        },
        loginUserToStore: (loggedIn) => {
            const action = {
                type: constants.LOGIN_USER,
                loggedIn
            }
            dispatch(action)
        },
        setConnectionParametersToStore: (param, value) => {
            const action = {
                type: constants.SET_CONNECTION_PARAMS,
                param: param,
                value: value
            }
            dispatch(action)
        },
        setCollectionConfigToStore: (collections) => {
            const action = {
                type: constants.SET_DBCOLLECTIONS,
                DBcollections: collections
            }
            dispatch(action)
        },
        setConnectionStateToStore: (isConnected) => {
            // console.log(isConnected);
            const action = {
                type: constants.SET_ISCONNECTED,
                isDBConnected: isConnected
            }
            dispatch(action)
        },
        setCollectionToStore: (collection) => {
            const action = {
                type: constants.SET_COLLECTION,
                collection: collection
            }
            dispatch(action)
            dispatch(updateQuery())
            function updateQuery(){
                return (dispatch, getState)=>{
                    const state = getState();
                    dispatch({
                        type: constants.UPDATE_MONGO_QUERY,
                        state,
                    })
                }
            }
        },
        setResultsToStore: (results) => {
            const action = {
                type: constants.SET_RESULTS,
                queryResults: results
            }
            dispatch(action);
        },
        saveUsersToStore: (usersType, data) => {
            const action = {
                type: constants.SET_USERS,
                usersType,
                data,
            }
            dispatch(action);
        },
        pushMessageToHistory: (direction,message) => {
            // console.log('MESSAGE:', message);
            const action = {
                type: constants.PUSH_MESSAGE,
                direction,
                message,
            }
            dispatch(action);
        },
    }
}

export { mapStateToProps, mapDispatchToProps };
