import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";
import UserItem from './UserItem';

const UsersList = ({users, tagUser, showMenu, setShowMenu, currentUser, ...props}) => {
    return (
        <div className="users-list-wrap section-bg">
            <OverlayScrollbarsComponent defer options={{ scrollbars: { autoHide: 'move' } }}>
                <div className="users-list">
                    {
                        users.map(user => {
                            return <UserItem key={user.userName} userName={user.userName} currentUser={currentUser} color={user.color} tagUser={tagUser}/>;
                        })
                    }
                </div>
            </OverlayScrollbarsComponent>
        </div>
    );
}

export default UsersList;