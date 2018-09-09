import constants from '../constants';
import axios from 'axios';

const mapStateToProps = (state) => {
    return {
        storeAllUsers: state.share.allUsers,
        storeActiveUsers: state.share.activeUsers,
    }
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        setAllUsersToStore: () => {
            // dispatch(updateQuery())
            // async function updateQuery(){
            //     const users = await axios.get(`/users/:all`, data);;
            //     return (dispatch, getState)=>{
            //         dispatch({
            //             type: constants.SET_ALL_USERS,
            //             users,
            //         })
            //     }
            // }
        },
    }
}

export { mapStateToProps, mapDispatchToProps};
