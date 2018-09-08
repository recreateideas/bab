import constants from '../constants';
import store from '../../store';

const mapStateToProps = (state) => {
    // console.log('@@ STAGE -> mapStateToProps');
    return {
        storeQuery: state.query,
        storeConfig: state.config,
        storeQueryType: state.query.queryType,
        storeQueryCollectionState: state.queryCollectionState,
        _paramsLine : {
            actives: [true],
            keys: [''],
            operators: [Object.keys(state.config.operators)[0]],
            types: [Object.keys(state.config.stringTypes)[0]],
            values: ['']
        },
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setQueryCollectionStateToStore: (collectionState) => {
            const action = {
                type: constants.SET_QUERY_COLLECTION_STATE,
                collectionState: collectionState
            }
            dispatch(action)
            const update_query = {
                type: constants.UPDATE_MONGO_QUERY,
                state: store.getState(),
            }
            dispatch(update_query)
        }
    }
} 

export { mapStateToProps, mapDispatchToProps };
