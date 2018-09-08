import constants from '../constants';
import initialState from '../initialState';
import QUERY from '../stringifyHelpers/stringifyStages';

const mongo = (state = initialState.mongo, action) => {
    const obj = Object.assign({}, state);
    switch (action.type) {
        case constants.SET_DBCOLLECTIONS:
            return Object.assign({}, state, { ...state, DBcollections: action.DBcollections } );
        case constants.SET_RESULTS:
            return Object.assign({}, state, { ...state, mongo_results: action.queryResults } );
        case constants.SET_QUERYMESSAGE:
            return Object.assign({}, state, { ...state, [action.messageType]: action.queryMessage } );
        case constants.UPDATE_MONGO_QUERY:
            let Query = QUERY(state,action.query);
            console.log('aaa',action.query);
            return Object.assign({}, state, { ...state, mongo_query: Query.string, mongo_object: Query.paramsObj } );
        default:
            return Object.assign({}, state, obj);
    }
}

export default mongo;
