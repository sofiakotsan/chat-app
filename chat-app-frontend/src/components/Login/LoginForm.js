import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../../assets/svg/send-icon.svg";

const LoginForm = ({login, errors, userName, ...props}) => {
    const [userNameInput, setUserNameInput] = useState( userName ? userName : '');

    const onUserNameInputChange = (e) => {
        setUserNameInput(e.target.value);
    }

    const onLoginSubmit = (e) => {
        e.preventDefault();
        login(e.target.elements.userName.value.trim());
        // setUserName('');
    }

    return (
        <div className="login-form-wrap ">
            <form className="login-form" onSubmit={onLoginSubmit}>
                <input className="login-form-input" name="userName" placeholder="Choose a username" value={userNameInput} onChange={onUserNameInputChange}/>
                <button className="login-form-submit" type="submit">
                    <SendIcon/>
                </button>
            </form>
            { errors.length ? 
            <div className="login-form-errors">
                {errors.map(error => <div className="login-form-error">{error}</div>)}
            </div> : null }
        </div>
    );
}

export default LoginForm;