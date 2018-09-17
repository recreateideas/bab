
const mapStateToProps = (state) => {
    return {
        storeChats: state.share.chats,
    }
}

export { mapStateToProps };
