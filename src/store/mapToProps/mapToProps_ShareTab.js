import constants from '../constants';

const mapStateToProps = (state) => {
    return {
        storeUser: state.user,
        storeUserTo: state.share.userTo,
        storeAllUsers: state.share.allUsers,
        storeActiveUsers: state.share.activeUsers,
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
    }
}

export { mapStateToProps, mapDispatchToProps};
