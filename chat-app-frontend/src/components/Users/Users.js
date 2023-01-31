import React from "react";
import { connect } from 'react-redux';
import UsersList from './UsersList';
import { userTagged, searchQueryChanged } from "../../redux/actions";
import SearchForm from "../SearchForm/SearchForm";
import UsersMobileMenu from "./UsersMobileMenu";

const Users = ({users, searchedUsers, searchQuery, tagUser, changeSearchQuery, showMenu, setShowMenu, ...props}) => {
    return (
            <div className='users'>
                <SearchForm searchQuery={searchQuery} changeSearchQuery={changeSearchQuery}/>
                <UsersMobileMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
                <UsersList users={ searchedUsers || users } tagUser={(userName) => { tagUser(userName); setShowMenu(false); }}/>
            </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        searchQuery: state.usersReducer.searchQuery,
        searchedUsers: state.usersReducer.searchedUsers,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tagUser(userName) { dispatch(userTagged(userName)); },
        changeSearchQuery(query) { dispatch(searchQueryChanged(query)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);