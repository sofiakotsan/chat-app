import actionTypes from '../actionTypes';

let initState = {
    users: [],
    searchQuery: '',
    searchedUsers: null,
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state, 
                users: action.payload.userData.users
            };
        case actionTypes.USER_CONNECTED:
            return {
                ...state,
                users: state.users.concat(action.payload.userData),
            }
        case actionTypes.USER_DISCONNECTED:
            return {
                ...state, 
                users: state.users.filter(user => {
                
                    return user.userName !== action.payload.userData.userName;
                })
            }
        case actionTypes.SEARCH_QUERY_CHANGED: 
            let searchedUsers = null;
            if(action.payload.query) {
                searchedUsers = state.users.filter(user => {
                    return user.userName.startsWith(action.payload.query);
                })
            }

            return {
                ...state,
                searchQuery: action.payload.query,
                searchedUsers: searchedUsers
            }
        default: 
            return state;
    }
}

export default usersReducer;