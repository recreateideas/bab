import constants from '../constants';

const mapStateToProps = (state) => {
    return {
        storeUser: state.user,
        storeUserTo: state.share.userTo,
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
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
