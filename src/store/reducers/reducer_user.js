import constants from '../constants';
import initialState from '../initialState';

const mongo = (state = initialState.user, action) => {
    const obj = Object.assign({}, state);
    switch (action.type) {
        case constants.RECORD_USER_DETAILS:
            return Object.assign({}, state, { ...state, [action.field]: action.data } );
        case constants.LOGIN_USER:
            return Object.assign({}, state, { ...state, loggedIn: action.loggedIn } );
        case constants.RECORD_USER_OBJECT:
            return Object.assign({}, state,  action.user);
        default:
            return Object.assign({}, state, obj);
    }
}

export default mongo;
