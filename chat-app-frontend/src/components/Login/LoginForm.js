import React, { useEffect, useState } from "react";
import { ReactComponent as SendIcon } from "../../assets/svg/send-icon.svg";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const LoginForm = ({login, errors, userName, ...props}) => {
    const [userNameInput, setUserNameInput] = useState( userName ? userName : '');
    const [isLoggingIn, setLoggingIn] = useState('false');

    const onUserNameInputChange = (e) => {
        setUserNameInput(e.target.value);
    }

    const onLoginSubmit = (e) => {
        e.preventDefault();
        login(e.target.elements.userName.value.trim());
        setLoggingIn('false')
        // setUserName('');
    }

    useEffect(() => {
        if(isLoggingIn) setLoggingIn(false);
    }, [errors]);

    return (
        <div className="login-form-wrap">
            <form className={"login-form" + (isLoggingIn ? " login-form--waiting" : "")} onSubmit={onLoginSubmit}>
                <input className="login-form-input" name="userName" placeholder="Choose a username" value={userNameInput} onChange={onUserNameInputChange}/>
                <button className="login-form-submit" type="submit">
                    <SendIcon/>
                </button>
            </form>
            { isLoggingIn ? <Loader/> : errors.length ? <ErrorMessage messages={errors}/> : null }
        </div>
    );
}

export default LoginForm;