import React  from "react";
import { ReactComponent as SendIcon } from "../../assets/svg/send-icon.svg";

const MessageForm = ({message, onMessageChange, sendMessage, ...props}) => {
    const onMsgInputChange = (e) => {
        onMessageChange(e.target.value);
    }

    const onMessageSubmit = (e) => {
        e.preventDefault();
        sendMessage(e.target.elements.messageText.value.trim());
        onMessageChange('');
    }

    return (
        <div className="message-form-wrap ">
            <form className="message-form" onSubmit={onMessageSubmit}>
                <textarea className="message-form-input" name="messageText" placeholder="Start typing your message..." value={message} onChange={onMsgInputChange}/>
                <button className="message-form-submit" type="submit">
                    <SendIcon/>
                </button>
            </form>
        </div>
    );
}

export default MessageForm;