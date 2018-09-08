import constants from '../constants';

const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        storeQueryMessage: state.mongo.queryMessage,
        storeQueryError: state.mongo.queryError,
        storeAllState: state,
        storeDBConnected: state.connection.isDBConnected,
        storeConfig: state.config,
        storeQueryType: state.query.queryType,
        storeMongoQuery: state.mongo.mongo_query,
        storeQuery: state.query,
        storeQueryCollectionState: state.queryCollectionState,
        _collectionStateTemplate: {
            isActive : true,
            preStage : '',
            params: {
                actives: [true],
                keys: [''],
                operators: [Object.keys(state.config.operators)[0]],
                types: [Object.keys(state.config.stringTypes)[0]],
                values: ['']
            }
        },
        _stageTemplate: {
            valueTypeLeft : '"',
            valueTypeRight :'"',
            isActive: true,
            preStage: '',
            params: {
                actives: [true],
                keys: [''],
                operators: [Object.keys(state.config.operators)[0]],
                types: [Object.keys(state.config.stringTypes)[0]],
                values: ['']
            }
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('@@ APP -> mapDispatchToProps');
    return {
        setCollectionToStore: (collection) => {
            const action = {
                type: constants.SET_COLLECTION,
                collection: collection
            }
            dispatch(action);
        },
        setConfigQueriesToStore: (queries) => {
            const action = {
                type: constants.SET_CONFIG_QUERIES,
                queries: queries
            }
            dispatch(action);
        },
        setQueryValuesToStore: (query) => {
            const action = {
                type: constants.SET_QUERY_VALUES,
                query: query
            }
            dispatch(action);
        },
        setQueryTypeToStore: (type) => {
            const action = {
                type: constants.SET_QUERY_TYPE,
                queryType: type
            }
            dispatch(action);
        },
        setQueryCollectionStateToStore: (collectionState) => {
            const action = {
                type: constants.SET_QUERY_COLLECTION_STATE,
                collectionState: collectionState
            }
            dispatch(action);
        },
        recordUserObjectToStore: (user) => {
            const action = {
                type: constants.RECORD_USER_OBJECT,
                user,
            }
            dispatch(action)
        },
    }
}

export { mapStateToProps, mapDispatchToProps};
