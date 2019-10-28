import React from 'react';
import './SearchBox.scss';

const SearchBoxViewDisplay = ({onLoginButtonClick, onSearchRepository, userState}) => {
    let buttonText = '';
    if(userState)
        buttonText = 'Log out';
    else
        buttonText = 'Login with GitHub';
    return (
        <div className="search-box">
            <button type="submit" onClick={onLoginButtonClick}>{buttonText}</button>
            <input className="search-box__input"
                   type="text"
                   placeholder="Search User repositories"
                   onChange={onSearchRepository}
            />
        </div>
    );
};

export default SearchBoxViewDisplay;
