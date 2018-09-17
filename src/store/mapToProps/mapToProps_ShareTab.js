
const mapStateToProps = (state) => {
    return {
        storeChats: state.share.chats,
        storeUserTo: state.share.userTo,
    }
}


export { mapStateToProps };
