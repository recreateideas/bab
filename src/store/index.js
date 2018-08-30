import {createStore} from 'redux';
import constants from './constants';
import initialState from './initialState';
import QUERY from './stringifyHelpers/stringifyStages';

/** REDUCERS run in the store */

const reducer = (state = initialState, action) => {  // 1 is the initial state initialised by redux on booting
    //  console.log('reducer',action);
    //  console.log(state);
    //let mongoQuery = QUERY(state);
    let newState,Query;
    // console.log(mongoQuery);
    const obj = Object.assign({}, state);
    switch(action.type){
        case constants.APP_SET_COLLECTION:
            newState = Object.assign({}, state, { collection: action.collection});
            Query = QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj});
        case constants.APP_SET_CONFIG_QUERIES:
            obj.config.queries = Object.assign({},action.queries);
            return Object.assign({},state,obj);
        case constants.APP_SET_QUERY_TYPE:
            newState = Object.assign({}, state, { queryType: action.queryType });
            Query = QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj });
        case constants.APP_SET_QUERY_VALUES:
            return Object.assign({}, state, { query: action.query });
        case constants.APP_SET_QUERY_COLLECTION_STATE:
            newState = Object.assign({}, state, { queryCollectionState: action.collectionState});
            Query= QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj });

        case constants.STAGE_SET_QUERY_COLLECTION_STATE:
            newState = Object.assign({}, state, { queryCollectionState: action.collectionState });
            Query = QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj });
        case constants.FORMLINE_SET_QUERY_COLLECTION_STATE:
            newState = Object.assign({}, state, { queryCollectionState: action.collectionState });
            Query = QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj });

        case constants.CURSOR_INSERT_CURSOR:
            newState = Object.assign({}, state, { query: { ...state.query, cursors: Object.assign({},action.cursors )}});
            Query = QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj });
    
        case constants.CONNECTOR_SET_DBCOLLECTIONS:
            return Object.assign({},state, {DBcollections: action.DBcollections});
        case constants.CONNECTOR_SET_COLLECTION:
            newState = Object.assign({}, state, { collection: action.collection })
            Query = QUERY(newState);
            return Object.assign({}, newState, { mongo_query: Query.string, mongo_object: Query.paramsObj  });
        case constants.CONNECTOR_SET_ISCONNECTED:
            return Object.assign({}, state, { connection: { ...state.connection, isDBConnected: action.isDBConnected } });
        case constants.CONNECTOR_SET_CONNECTION_PARAMS:
            return Object.assign({}, state, { connection: { ...state.connection, [action.param]: action.value } });

        case constants.INTERROGATOR_SET_RESULTS:
            return Object.assign({}, state, { mongo_results: action.queryResults });
        case constants.INTERROGATOR_SET_QUERYMESSAGE:
            return Object.assign({}, state, { [action.messageType]: action.queryMessage });

        case constants.LOGINIFRAME_RECORD_USER_DETAILS:
            return Object.assign({}, state, { user: { ...state.user, [action.field]: action.data}});
        case constants.LOGINIFRAME_LOGIN_USER:
            return Object.assign({}, state, { user: { ...state.user, loggedIn: action.loggedIn}});
        case constants.LOGINIFRAME_RECORD_USER_OBJECT:
            return Object.assign({}, state, { user: Object.assign({},action.user )});

        case constants.TOOLS_APPLY_LOADED_STATE:
            return Object.assign({}, state, action.loadedContent);
        default:
            return Object.assign({}, state,obj);
    }

 //ALWAYS RETURN THE STATE FROM A REDUCER
}

/** STORE */

const store = createStore(reducer, /* preloadedState, remove those when going to production-->*/ window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**    add this to index.html when going to production <script>
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () { }
    </script> */
export default store;
