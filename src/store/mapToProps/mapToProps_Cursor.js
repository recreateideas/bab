import constants from '../constants';

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
                type: constants.CURSOR_INSERT_CURSOR,
                cursors: cursors
            }
            dispatch(action)
        }
    }
}

export { mapStateToProps, mapDispatchToProps };
