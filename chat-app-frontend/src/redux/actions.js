import actionTypes from "./actionTypes"

export const authSuccess = (userData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {userData}
    }
}

export const authError = (errors) => {
    return {
        type: actionTypes.AUTH_ERROR,
        payload: {errors}
    }
}

export const userConnected = (userData) => {
    return {
        type: actionTypes.USER_CONNECTED,
        payload: {userData}
    }
}

export const userDisconnected = (userData) => {
    return {
        type: actionTypes.USER_DISCONNECTED,
        payload: {userData}
    }
}

export const newMessage = (msgData) => {
    return {
        type: actionTypes.NEW_MESSAGE,
        payload: {msgData}
    }
}

export const currentMessageChange = (msgText) => {
    return {
        type: actionTypes.CURRENT_MESSAGE_CHANGE,
        payload: {msgText}
    }
}

export const userTagged = (userName) => {
    return {
        type: actionTypes.USER_TAGGED,
        payload: {userName}
    }
}

export const searchQueryChanged = (query) => {
    return {
        type: actionTypes.SEARCH_QUERY_CHANGED,
        payload: {query}
    }
}

export const serverConnected = () => {
    return {
        type: actionTypes.SERVER_CONNECTED,
    }
}

export const serverConnectionError = () => {
    return {
        type: actionTypes.SERVER_CONNECTION_ERROR,
    }
}