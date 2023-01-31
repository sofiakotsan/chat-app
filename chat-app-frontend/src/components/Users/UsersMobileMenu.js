import React from "react";
import { ReactComponent as MenuIcon } from "../../assets/svg/menu-icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/svg/close-icon.svg";

const UsersMobileMenu = ({showMenu, setShowMenu, ...props}) => {
    return (
        <div className="users-menu section-bg">
            <div className="users-menu-list">
                <button className="users-menu-button" onClick={() => { setShowMenu(!showMenu); }}>
                    { showMenu ? <CloseIcon/> : <MenuIcon/> }
                </button>
            </div>
        </div>
    );
}

export default UsersMobileMenu;