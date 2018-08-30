import constants from '../constants';

const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        // storeResults: state.Resultsmongo_results,
        storeQueryParams: state.query,
        storeDBConnected: state.connection.isDBConnected,
        storeMongoObject: state.mongo_object,
        storeCollection: state.collection,
        storeQueryType: state.queryType,
        storeDB: state.connection.db
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        setResultsToStore: (results) => {
            const action = {
                type: constants.INTERROGATOR_SET_RESULTS,
                queryResults: results
            }
            dispatch(action);
        },
        setQueryMessageToStore: (messageType,message) => {
            const action = {
                type: constants.INTERROGATOR_SET_QUERYMESSAGE,
                messageType: messageType,
                queryMessage: message
            }
            dispatch(action);
        }
    }
}

export { mapStateToProps, mapDispatchToProps};