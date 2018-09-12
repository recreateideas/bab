import constants from '../constants';

const mapStateToProps = (state) => {
    return {
        storeDBConnected: state.connection.isDBConnected,
     
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        recordUserObjectToStore: (user) => {
            const action = {
                type: constants.RECORD_USER_OBJECT,
                user,
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
        pushMessageToHistory: message => {
            console.log('MESSAGE:', message);
            const action = {
                type: constants.PUSH_MESSAGE,
                message,
            }
            dispatch(action);
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
