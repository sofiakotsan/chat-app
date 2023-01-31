import React from "react";
import { connect } from 'react-redux';
import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import ServerApi from "../../api/ServerApi";
import { currentMessageChange, userTagged } from "../../redux/actions";

const Messages = ({messages, authInfo, currentMessage, changeCurrentMessage, tagUser, ...props}) => {

    const sendMessage = (messageText) => {
        if (!(messageText.trim())) return;
        ServerApi.sendMessage(messageText);
    }

    return (
        <div className="messages section-bg">
            <MessagesList messages={messages} currentUser={authInfo.userName} tagUser={tagUser}/>
            <MessageForm message={currentMessage} onMessageChange={changeCurrentMessage} sendMessage={sendMessage}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        messages: state.messagesReducer.messages,
        currentMessage: state.messagesReducer.currentMessage,
        authInfo: state.authReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentMessage(msgText) { dispatch(currentMessageChange(msgText)) },
        tagUser(userName) { dispatch(userTagged(userName)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);