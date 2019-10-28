import React from 'react';
import './LoginWindow.scss';

const LoginWindowViewDisplay = ({onExitWindowButtonClick, containerClass, onLoginButtonClick}) => {
    return (
        <div className={'login-box ' + containerClass}>
            <div className="login-box__close-btn" onClick={onExitWindowButtonClick}>
                <div className="login-box__close-btn__bar1"></div>
                <div className="login-box__close-btn__bar2"></div>
            </div>
            <input className="login-box__username" type="text" placeholder="Username"/>
            <input className="login-box__password" type="password" placeholder="Password"/>
            <button type="submit" onClick={onLoginButtonClick}>Login</button>
        </div>
    );
};

export default LoginWindowViewDisplay;
