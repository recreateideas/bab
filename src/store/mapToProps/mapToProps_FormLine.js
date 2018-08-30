import constants from '../constants';

const mapStateToProps = (state) => {
    // console.log('@@ FORMLINE -> mapStateToProps');
    return {
        storeQuery: state.query,
        storeConfig: state.config,
        storeQueryType: state.queryType,
        storeQueryCollectionState: state.queryCollectionState
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('@@ FORMLINE -> mapDispatchToProps');
    return {
        setQueryCollectionStateToStore: (collectionState) => {
            const action = {
                type: constants.FORMLINE_SET_QUERY_COLLECTION_STATE,
                collectionState: collectionState
            }
            dispatch(action);
        }
    }
}

export { mapStateToProps, mapDispatchToProps };
