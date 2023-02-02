import React, { useEffect } from "react";
import Chat from "../Chat/Chat";
import Login from "../Login/Login";
import ProviderHOC from "../../hoc/ProviderHOC";
import { connect } from "react-redux";
import ServerApi from "../../api/ServerApi";
import AuthApi from "../../api/AuthApi";
import { authError } from "../../redux/actions";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function Auth({isAuth, userName, errors, serAuthErrors, isConnectingServer, isConnectionOK, ...props}) {
    const login = (userName) => {
        let checkUserNameResult = AuthApi.checkUserName(userName);

        if(checkUserNameResult.isValid) {
            ServerApi.initUser(userName);
            serAuthErrors([]);
        } else{
            serAuthErrors(checkUserNameResult.errors);
        }

        console.log(userName)
    }

    useEffect(() => {
        if(!isAuth && userName) {
            login(userName);
        }
    }, []);

	return (
        isConnectingServer ? <div className="auth-container"><Loader/></div>
        : isConnectionOK ? (isAuth ? <Chat /> : <Login errors={errors} login={login} userName={userName}/>) 
        : <div className="auth-container"><ErrorMessage messages={["Error connecting to the server. Please, try again later."]}/></div>
	);
}

const mapStateToProps = (state) => {
    return {
        isConnectingServer: state.authReducer.isConnectingServer,
        isConnectionOK: state.authReducer.isConnectionOK,
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
