import constants from '../constants';

const mapStateToProps = (state) => {
    // console.log('@@ CURSOR -> mapStateToProps');
    return {
        storeConnection: state.connection,
        storeUser: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recordUserDetailsToStore: (field, data) => {
            const action = {
                type: constants.LOGINIFRAME_RECORD_USER_DETAILS,
                field,
                data
            }
            dispatch(action)
        },
        recordUserObjectToStore: (user) => {
            const action = {
                type: constants.LOGINIFRAME_RECORD_USER_OBJECT,
                user,
            }
            dispatch(action)
        },
        loginUserToStore: (loggedIn) => {
            const action = {
                type: constants.LOGINIFRAME_LOGIN_USER,
                loggedIn
            }
            dispatch(action)
        },
        setConnectionParametersToStore: (param, value) => {
            const action = {
                type: constants.LOGINIFRAME_SET_CONNECTION_PARAMS,
                param: param,
                value: value
            }
            dispatch(action);
        },
        setCollectionConfigToStore: (collections) => {
            const action = {
                type: constants.LOGINIFRAME_SET_DBCOLLECTIONS,
                DBcollections: collections
            }
            dispatch(action);
        },
        setConnectionStateToStore: (isConnected) => {
            // console.log(isConnected);
            const action = {
                type: constants.LOGINIFRAME_SET_ISCONNECTED,
                isDBConnected: isConnected
            }
            dispatch(action);
        },
        setCollectionToStore: (collection) => {
            const action = {
                type: constants.LOGINIFRAME_SET_COLLECTION,
                collection: collection
            }
            dispatch(action);
        },
        setResultsToStore: (results) => {
            const action = {
                type: constants.LOGINIFRAME_SET_RESULTS,
                queryResults: results
            }
            dispatch(action);
        },
    }
}

export { mapStateToProps, mapDispatchToProps };
