import constants from '../constants';
import initialState from '../initialState';

const share = (share = initialState.share, action) => {
    const obj = Object.assign({}, share);
    switch (action.type) {
        case constants.SET_USERS:
            return Object.assign({}, share, { ...share, [action.usersType]: action.data });
        case constants.SET_USER_TO:
            return Object.assign({}, share, { ...share, userTo: action.userTo });
        case constants.PUSH_MESSAGE:
            const messageHistory = share.chats && share.chats[action.message.receiverId] ? share.chats[action.message.receiverId].messages : [];
            const newMessage = {
                direction: action.direction,
                content: action.message.content,
                date: action.message.dateSent,
            }
            messageHistory.push(newMessage);
            const newState = Object.assign({}, share, { ...share, chats: { ...share.chats, [action.message.receiverId]: {...share.chats[action.message.receiverId], messages: messageHistory}} });
            localStorage.setItem('chats',JSON.stringify(newState.chats));
            return  Object.assign({}, share, newState);
        case constants.LOAD_LOCALSTORAGE_MESSASGES:
            return Object.assign({}, share, { ...share, chats: action.chats });
        default:
            return Object.assign({}, share, obj);
    }
}

export default share;


// LOAD_LOCALSTORAGE_MESSASGES
