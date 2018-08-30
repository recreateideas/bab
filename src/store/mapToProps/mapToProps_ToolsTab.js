import constants from '../constants';

const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        storeAllState: state,
        storeQueryResults: state.mongo_results,
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log('@@ TOOL -> applyLoadedStateQueryToStore');
    return {
        applyLoadedStateQueryToStore: (loadedContent) => {
            const action = {
                type: constants.TOOLS_APPLY_LOADED_STATE,
                loadedContent: loadedContent
            }
            dispatch(action)
        }
    }
}

export { mapStateToProps, mapDispatchToProps };
