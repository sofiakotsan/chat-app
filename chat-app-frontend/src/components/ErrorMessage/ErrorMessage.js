import React from "react";

const ErrorMessage = ({messages, ...props}) => {
    return (
        <div className="error-message">{messages.map(msg => <div className="error-message-item">{msg}</div>)}</div>
    );
}

export default ErrorMessage;