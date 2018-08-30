const mapStateToProps = (state) => {
    return {
        storeConnection: state.connection,
        storeUser: state.user,
    }
}

export { mapStateToProps };
