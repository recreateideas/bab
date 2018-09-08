import constants from '../constants';
import store from '../../store';

const mapStateToProps = (state) => {
    const isPretty = state.query.cursors.hasOwnProperty('pretty')
    return {
        storeQuery: state.query,
        storeConfig: state.config,
        storeisPretty: isPretty,
        storeResults: state.mongo.mongo_results,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertCursorInQueryToStore: (cursors) => {
            const action = {
                type: constants.INSERT_CURSOR,
                cursors: cursors
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
