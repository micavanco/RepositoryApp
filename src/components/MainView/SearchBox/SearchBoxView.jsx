import React from 'react';
import './SearchBox.scss';

const SearchBoxViewDisplay = ({onLoginButtonClick, onSearchRepository, userState}) => {
    let buttonText = '';
    let loggedUser = '';
    if(userState) {
        buttonText = 'Log out';
        const credentials = JSON.parse(localStorage.getItem('credentials'));
        loggedUser = `Logged as: ${credentials.username}`;
    }
    else
        buttonText = 'Login with GitHub';
    return (
        <div className="search-box">
            <button className="search-box__login" type="submit" onClick={onLoginButtonClick}>{buttonText}</button>
            { loggedUser }
            <input className="search-box__input"
                   type="text"
                   placeholder="Search User repositories"
                   onChange={onSearchRepository}
            />
        </div>
    );
};

export default SearchBoxViewDisplay;
