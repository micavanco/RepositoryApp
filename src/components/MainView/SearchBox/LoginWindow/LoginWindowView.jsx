import React from 'react';
import './LoginWindow.scss';

const LoginWindowViewDisplay = () => {
    return (
        <div className="login-box setInvisible">
            <input className="login-box__username" type="text" placeholder="Username"/>
            <input className="login-box__password" type="text" placeholder="Username"/>
            <button type="submit">Login</button>
        </div>
    );
};

export default LoginWindowViewDisplay;
