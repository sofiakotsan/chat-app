import React from "react";
import { wrapUserNames } from "../../utils/utils";

const MessageItem = ({message, currentUser, tagUser, ...props}) => {
    let isIncoming = message.author !== currentUser;
    let color = isIncoming && message.color ? message.color : 'plain';

    const onMessageClick = (e) => {
        if(e.target.classList.contains('user-tag')) {
            tagUser(e.target.textContent);
        }
    }

    const getFormattedDate = (date) => {
        date = new Date(date);
        
        let timeText = date.toLocaleTimeString('en-GB', {timeStyle: 'short'});
        let dateText = date.toLocaleDateString('en-GB', {dateStyle: 'short'});
        
        return timeText + " (" + dateText + ")";
    }

    return (
        <div className="message-wrap">
            <div className={`message user-color user-color--${color} ${isIncoming ? 'message--incoming' : ''}`}
                onClick={onMessageClick}>
                <div className="message-header">
                    <span className="message-author user-name"><span className="user-tag">@{message.author}</span>{!isIncoming ? ' (me)' : ''}</span>
                    <span className="message-header-separator">~</span>
                    <span className="message-time">{getFormattedDate(message.date)}</span>
                </div>
                <div className="message-body">{wrapUserNames(message.text)}</div>
                {/* <div className="message-arrow">
                <svg viewBox="0 0 100 100">
                    <polygon points="0,0 100,0 0,100" fill="currentColor" />
                </svg>
                </div> */}
            </div>
        </div>
    );
}

export default MessageItem;