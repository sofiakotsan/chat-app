import React, { useState } from "react";
import Messages from '../Messages/Messages';
import Users from '../Users/Users';

const Chat = () => {
    const [showMenu, setShowMenu,] = useState(false);

	return (
        <div className="chat">
            <div className={'chat-container' + (showMenu ? ' chat-container--menu-open' : '')}>
                <div className='users-wrap'>
                    <Users showMenu={showMenu} setShowMenu={setShowMenu}/>
                </div>
                <div className='messages-wrap'>
                    <Messages/>
                </div>
            </div>
        </div>
        
	);
}

export default Chat;
