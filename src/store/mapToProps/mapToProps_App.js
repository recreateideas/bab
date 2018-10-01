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
        pushMessageToHistory: (direction,message) => {
            // console.log('MESSAGE:', message);
            const action = {
                type: constants.PUSH_MESSAGE,
                direction,
                message,
            }
            dispatch(action);
        },
        loadLocalStorageMessagesToStore: () => {
            const chats = localStorage.getItem('chats')? JSON.parse(localStorage.getItem('chats')) : [];
            const action = {
                type: constants.LOAD_LOCALSTORAGE_MESSASGES,
                chats
            }   
            dispatch(action)
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
