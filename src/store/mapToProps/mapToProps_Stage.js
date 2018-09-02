import constants from '../constants';

const mapStateToProps = (state) => {
    // console.log('@@ STAGE -> mapStateToProps');
    return {
        storeQuery: state.query,
        storeConfig: state.config,
        storeQueryType: state.queryType,
        storeQueryCollectionState: state.queryCollectionState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setQueryCollectionStateToStore: (collectionState) => {
            const action = {
                type: constants.STAGE_SET_QUERY_COLLECTION_STATE,
                collectionState: collectionState
            }
            dispatch(action);
        }
    }
} 

export { mapStateToProps, mapDispatchToProps };
