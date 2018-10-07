
const mapStateToProps = (state) => {
    // console.log(state.share);
    return {
        storeActiveUsers: state.share.activeUsers,
        storeReceiver: state.share.receiver,
        storeChats: state.share.chats,
    }
}

export { mapStateToProps };
