import React from 'react';
import './SearchBox.scss';

const SearchBoxViewDisplay = ({onLoginButtonClick, onSearchRepository}) => {
    return (
        <div className="search-box">
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
