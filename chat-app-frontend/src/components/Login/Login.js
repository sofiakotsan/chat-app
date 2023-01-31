import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { connect } from 'react-redux';

const Login = ({login, errors, userName, ...props}) => {
	return (
		<div className="login">
			<h2>Please, choose a username:</h2>
			<p>Only letters, numbers and underscores are allowed.</p>
            <LoginForm  errors={errors} login={login} userName={userName}/>
        </div>
	);
}

export default Login;
