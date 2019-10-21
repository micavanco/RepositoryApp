import React from 'react';
import './SearchBox.scss';

const SearchBoxViewDisplay = () => {
    return (
        <div className="search-box">
            <a href="https://github.com/login/oauth/authorize?client_id=">Sign In with GitHub</a>
            <input className="search-box__input" type="text" placeholder="Search User repositories"/>
        </div>
    );
};

export default SearchBoxViewDisplay;
