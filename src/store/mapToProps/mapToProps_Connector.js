import constants from '../constants';
import store from '../../store';

const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        storeConnection: state.connection,
        storeUser: state.user,
        storeUserLoggedIn: state.user.loggedIn,
        // storeConnectionMessage: state.connectionMessage,
        // storeIsConnected: state.isDBConnected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
            const update_query = {
                type: constants.UPDATE_MONGO_QUERY,
                state: store.getState(),
            }
            dispatch(update_query)
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
