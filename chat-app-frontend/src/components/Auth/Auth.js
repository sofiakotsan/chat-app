import React, { useState, useEffect } from "react";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";
import ProviderHOC from "../../hoc/ProviderHOC";
import { connect } from "react-redux";
import ServerApi from "../../api/ServerApi";
import AuthApi from "../../api/AuthApi";
import { authError } from "../../redux/actions";

function Auth({isAuth, userName, errors, serAuthErrors, ...props}) {
    const login = (userName) => {
        let checkUserNameResult = AuthApi.checkUserName(userName);

        if(checkUserNameResult.isValid) {
            ServerApi.initUser(userName);
            serAuthErrors([]);
        } else{
            serAuthErrors(checkUserNameResult.errors);
        }
    }

    useEffect(() => {
        if(!isAuth && userName) {
            login(userName);
        }
    }, []);

	return (
        isAuth ? <Chat /> : <Login errors={errors} login={login} userName={userName}/>
	);
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        userName: state.authReducer.userName,
        errors: state.authReducer.errors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        serAuthErrors(errors) { dispatch(authError(errors)) }
    }
}

export default ProviderHOC(connect(mapStateToProps, mapDispatchToProps)(Auth));
