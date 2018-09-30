
const mapStateToProps = (state) => {
    // console.log(state.share);
    return {
        storeActiveUsers: state.share.activeUsers,
        storeUserTo: state.share.userTo,
    }
}

export { mapStateToProps };
