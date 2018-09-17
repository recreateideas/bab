

const formatMessages = (userId, messageHistory) => {
    let formattedMessages = {}, direction = '', chatId = '';
    console.log(messageHistory);
    // let newId='',newDirection='';
    messageHistory.forEach(message => {
        if (!formattedMessages.hasOwnProperty(message.receiverId) && message.receiverId !== userId) {
            formattedMessages[message.receiverId] = {
                messages: [
                    {
                        direction: 'sent',
                        content: message.content,
                        date: message.dateSent,
                    }
                ]
            };
        } else if (!formattedMessages.hasOwnProperty(message.senderId) && message.senderId !== userId) {
            formattedMessages[message.senderId] = {
                messages: [
                    {
                        direction: 'received',
                        content: message.content,
                        date: message.dateSent,
                    }
                ]
            };
        } else if (formattedMessages.hasOwnProperty(message.receiverId) && message.receiverId !== userId) {
            formattedMessages[message.receiverId].messages.push(
                {
                    direction: 'sent',
                    content: message.content,
                    date: message.dateSent,
                }
            )
        } else if (formattedMessages.hasOwnProperty(message.senderId) && message.senderId !== userId) {
            formattedMessages[message.senderId].messages.push(
                {
                    direction:'received',
                    content: message.content,
                    date: message.dateSent,
                }
            )
        }
    });
    return formattedMessages;
};

const formatDate = (date) => {
    return [date.getMonth() + 1,
    date.getDate(),
    date.getFullYear()].join('/') + ' ' +
        [date.getHours(),
        date.getMinutes(),
        date.getSeconds()].join(':');
}

export { formatMessages, formatDate }
