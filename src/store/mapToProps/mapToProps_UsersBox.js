import constants from '../constants';
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        storeAllUsers: state.share.allUsers,
        storeActiveUsers: state.share.activeUsers,
        storeReceiver: state.share.receiver,
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        setReceiverToStore: (receiver) => {
            const action = {
                type: constants.SET_USER_TO,
                receiver
            }
            dispatch(action) 
        }
    }
}

export { mapStateToProps, mapDispatchToProps};
