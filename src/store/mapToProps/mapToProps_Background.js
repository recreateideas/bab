
const mapStateToProps = (state) => { 
    return {
        storeResults: state.mongo_results
    }
}


export { mapStateToProps };
