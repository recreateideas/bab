import constants from '../constants';

const mapStateToProps = (state) => {
    const isPretty = state.query.cursors.hasOwnProperty('pretty')
    // console.log(isPretty);
    return {
        storeQuery: state.query,
        storeConfig: state.config,
        storeisPretty: isPretty,
        storeResults: state.mongo_results,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertCursorInQueryToStore: (cursors) => {
            const action = {
                type: constants.BACKGROUND_INSERT_CURSOR,
                cursors: cursors
            }
            dispatch(action)
        }
    }
}

export { mapStateToProps, mapDispatchToProps };
