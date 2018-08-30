
const mapStateToProps = (state) => { // use this also to select what propsApp should listen to to rerender
    // console.log('@@ APP -> mapStateToProps');
    return {
        collections: state.DBcollections,
        collectionStore: state.collection
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export { mapStateToProps, mapDispatchToProps};
