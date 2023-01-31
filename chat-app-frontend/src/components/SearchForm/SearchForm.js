import React, { useState } from "react";
import { ReactComponent as SearchIcon } from '../../assets/svg/search-icon.svg'

const SearchForm = ({searchQuery, changeSearchQuery, ...props}) => {

    const onSearchChange = (e) => {
        changeSearchQuery(e.target.value);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="search-form-wrap section-bg">
            <form className="search-form" onSubmit={onSearchSubmit}>
                <button className="search-form-submit" type="submit"><SearchIcon/></button>
                <input value={searchQuery} onChange={onSearchChange} className="search-form-input" name="search" placeholder="Search"/>
            </form>
        </div>
    );
}

export default SearchForm;