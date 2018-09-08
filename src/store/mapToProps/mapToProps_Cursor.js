import constants from '../constants';
import store from '../../store';

const mapStateToProps = (state) => {
    // console.log('@@ CURSOR -> mapStateToProps');
    return {
        storeQuery: state.query,
        storeConfig: state.config,
        //storeCursors: state.cursors
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('@@ CURSOR -> mapDispatchToProps');
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
