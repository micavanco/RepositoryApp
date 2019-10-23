import React from 'react';
import './SearchBox.scss';
import LoginWindow from "./LoginWindow/LoginWindow";

const SearchBoxViewDisplay = ({onLoginButtonClick}) => {
    return (
        <div className="search-box">
            <LoginWindow/>
            <button type="submit" onClick={onLoginButtonClick}>Login with GitHub</button>
            <input className="search-box__input" type="text" placeholder="Search User repositories"/>
        </div>
    );
};

export default SearchBoxViewDisplay;
