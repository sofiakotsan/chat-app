import actionTypes from '../actionTypes';

let initState = {
    currentMessage: '',
    messages: [],
}

const messagesReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.NEW_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload.msgData),
            };
        case actionTypes.CURRENT_MESSAGE_CHANGE:
            return {
                ...state,
                currentMessage: action.payload.msgText
            }
        case actionTypes.USER_TAGGED:
            let tagSumbolIndex = action.payload.userName.indexOf('@');
            let userName = tagSumbolIndex === -1 ? action.payload.userName : action.payload.userName.slice(tagSumbolIndex + 1);
            return {
                ...state,
                currentMessage: state.currentMessage + '@' + userName
            }
        default: 
            return state;
    }
}

export default messagesReducer;