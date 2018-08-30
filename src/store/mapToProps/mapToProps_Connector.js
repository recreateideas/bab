import constants from '../constants';

const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        storeConnection: state.connection,
        storeUserLoggedIn: state.user.loggedIn,
        // storeConnectionMessage: state.connectionMessage,
        // storeIsConnected: state.isDBConnected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setConnectionParametersToStore: (param, value) => {
            const action = {
                type: constants.CONNECTOR_SET_CONNECTION_PARAMS,
                param: param,
                value: value
            }
            dispatch(action);
        },
        setCollectionConfigToStore: (collections) => {
            const action = {
                type: constants.CONNECTOR_SET_DBCOLLECTIONS,
                DBcollections: collections
            }
            dispatch(action);
        },
        setConnectionStateToStore: (isConnected) => {
            // console.log(isConnected);
            const action = {
                type: constants.CONNECTOR_SET_ISCONNECTED,
                isDBConnected: isConnected
            }
            dispatch(action);
        },
        // setConnectionMessageToStore: (message) => {
        //     // console.log(message);
        //     const action = {
        //         type: constants.CONNECTOR_SET_MESSAGE,
        //         connectionMessage: message
        //     }
        //     dispatch(action);
        // },
        setCollectionToStore: (collection) => {
            const action = {
                type: constants.CONNECTOR_SET_COLLECTION,
                collection: collection
            }
            dispatch(action);
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
