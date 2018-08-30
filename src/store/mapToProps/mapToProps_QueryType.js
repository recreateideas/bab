import constants from '../../store/constants';

const mapStateToProps = (state) => {
    return {
        storeQueryType: state.queryType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeQueryType: (e) => {
            const action = {
                type: constants.CHANGE_QUERY_TYPE,
                value: e.target.value
            }
            dispatch(action);
        }
    }
}


export { mapStateToProps, mapDispatchToProps };
