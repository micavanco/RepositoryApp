import React from 'react';
import './SearchBox.scss';
import LoginWindow from "./LoginWindow/LoginWindow";

const SearchBoxViewDisplay = ({onLoginButtonClick, containerClass, onSearchRepository}) => {
    return (
        <div className="search-box">
            <LoginWindow containerClass={containerClass}/>
            <button type="submit" onClick={onLoginButtonClick}>Login with GitHub</button>
            <input className="search-box__input"
                   type="text"
                   placeholder="Search User repositories"
                   onChange={onSearchRepository}
            />
        </div>
    );
};

export default SearchBoxViewDisplay;
