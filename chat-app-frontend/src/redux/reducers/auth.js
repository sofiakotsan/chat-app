import actionTypes from '../actionTypes';
import AuthApi from '../../api/AuthApi';

let initState = {
    userName: AuthApi.getUserName(),
    isAuth: false,
    errors: [],
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            AuthApi.setUserName(action.payload.userData.userName);
            return {
                ...state,
                isAuth: true,
                userName: action.payload.userData.userName,
                errors: [],
            }
        case actionTypes.AUTH_ERROR:
            return {
                ...state,
                errors: action.payload.errors
            }
        default: 
            return state;
    }
}

export default authReducer;