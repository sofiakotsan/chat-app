import React, { createRef, useEffect, useState } from "react";
import MessageItem from "./MessageItem";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const MessagesList = ({messages, currentUser, tagUser, ...props}) => {
    const list = createRef();
    const [prevScrollHeight, setPrevScrollHeight] = useState(0);

    useEffect(() => {
        let listViewport = list.current.getElement().querySelector('.os-viewport');

        if(!listViewport) return

        let lastMessageAuthor = messages.length ? messages.slice(-1)[0].author : '';

        if((Math.floor((prevScrollHeight - listViewport.scrollTop)) > listViewport.offsetHeight || !prevScrollHeight)
            && (!(lastMessageAuthor == currentUser))) {
            setPrevScrollHeight(listViewport.scrollHeight)
            return;
        }

        listViewport.scrollTop = listViewport.scrollHeight;
        setPrevScrollHeight(listViewport.scrollHeight)

    }, [messages]);

    return (
        <OverlayScrollbarsComponent defer options={{ scrollbars: { autoHide: 'move' } }} ref={list}>
                    <div className="messages-list" >
                        {
                            messages.map(msg => {
                                return <MessageItem key={msg.id} message={msg} currentUser={currentUser} tagUser={tagUser}/>
                            })
                        }
                    </div>
        </OverlayScrollbarsComponent>
    );
}

export default MessagesList;