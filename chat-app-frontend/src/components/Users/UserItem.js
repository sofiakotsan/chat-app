import React from "react";

const UserItem = ({userName, color, tagUser, currentUser, ...props}) => {
    const onUserClick = () => {
        tagUser(userName);
    }

    return (
        <li className={`user-item user-color user-color--clickable user-color--${color ? color : 'plain'} 
                        ${userName == currentUser ? 'user-item--current' : ''}`} onClick={onUserClick}>
            <span className="user-item-name user-name">@{userName}</span>
        </li>
    );
}

export default UserItem;