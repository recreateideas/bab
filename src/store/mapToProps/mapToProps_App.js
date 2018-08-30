import constants from '../constants';

const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        storeQueryMessage: state.queryMessage,
        storeQueryError: state.queryError,
        storeAllState: state,
        storeQueryParams: state.query,
        storeDBConnected: state.connection.isDBConnected,
        storeGreeting: state.greeting,
        storeConfig: state.config,
        storeQueryType: state.queryType,
        storeMongoQuery: state.mongo_query,
        storeQuery: state.query,
        storeQueryCollectionState: state.queryCollectionState
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('@@ APP -> mapDispatchToProps');
    return {
        setCollectionToStore: (collection) => {
            const action = {
                type: constants.APP_SET_COLLECTION,
                collection: collection
            }
            dispatch(action);
        },
        setConfigQueriesToStore: (queries) => {
            const action = {
                type: constants.APP_SET_CONFIG_QUERIES,
                queries: queries
            }
            dispatch(action);
        },
        setQueryValuesToStore: (query) => {
            const action = {
                type: constants.APP_SET_QUERY_VALUES,
                query: query
            }
            dispatch(action);
        },
        setQueryTypeToStore: (type) => {
            const action = {
                type: constants.APP_SET_QUERY_TYPE,
                queryType: type
            }
            dispatch(action);
        },
        setQueryCollectionStateToStore: (collectionState) => {
            const action = {
                type: constants.APP_SET_QUERY_COLLECTION_STATE,
                collectionState: collectionState
            }
            dispatch(action);
        },
        recordUserObjectToStore: (user) => {
            const action = {
                type: constants.LOGINIFRAME_RECORD_USER_OBJECT,
                user,
            }
            dispatch(action)
        },
    }
}

export { mapStateToProps, mapDispatchToProps};
