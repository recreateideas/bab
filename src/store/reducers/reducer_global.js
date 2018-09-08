import constants from '../constants';
import initialState from '../initialState';

const store = (state = initialState, action) => {
    const obj = Object.assign({}, state);
    switch (action.type) {
        case constants.APPLY_LOADED_STATE:
            return Object.assign({}, state, action.loadedContent);
        default:
            return Object.assign({}, state, obj);
    }
}

export default store;
