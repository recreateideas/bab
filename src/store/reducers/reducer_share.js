import constants from '../constants';
import initialState from '../initialState';

const mongo = (share = initialState.share, action) => {
    const obj = Object.assign({}, share);
    switch (action.type) {
        case constants.SET_USERS:
            return Object.assign({}, share, { ...share, [action.usersType]: action.data } );
        default:
            return Object.assign({}, share, obj);
    }
}

export default mongo;
