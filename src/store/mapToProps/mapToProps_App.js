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
            dispatch(action)
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
