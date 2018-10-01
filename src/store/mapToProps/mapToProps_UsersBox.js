import constants from '../constants';
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        storeAllUsers: state.share.allUsers,
        storeActiveUsers: state.share.activeUsers,
        storeUserTo: state.share.userTo,
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        setUserToToStore: (userTo) => {
            const action = {
                type: constants.SET_USER_TO,
                userTo
            }
            dispatch(action) 
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
