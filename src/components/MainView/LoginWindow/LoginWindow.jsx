import React, { Component } from 'react';
import LoginWindowView from "./LoginWindowView";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginWindowState } from "../../../redux/actions/loginWindowState";
import { loginUserState } from "../../../redux/actions/loginUserState";
import axios from 'axios';


class LoginWindow extends Component {

    constructor(params) {
        super(params);
        this.state = {containerClass: this.props.applicationState};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props)
            this.setState({
                containerClass: this.props.applicationState
            });
    }

    onExitWindowButtonClick() {
        this.props.loginWindowState('setInvisible');
    }

    onLoginButtonClick() {
        const username = document.querySelector('.login-box__username');
        const password = document.querySelector('.login-box__password');
        const warningElement = document.getElementById('warning-message');
        axios.get(`https://api.github.com/users/${username.value}/repos`, {
            headers: {
                Authorization: `Basic ${btoa(`${username.value}:${password.value}`)}`,
                'Content-Type': 'application/json'
        }}).then(res => {
            warningElement.classList.add('setInvisible');
            localStorage.setItem('credentials', `{"username":"${username.value}","password":"${password.value}"}`);
            this.props.loginUserState(true);
            this.props.loginWindowState('setInvisible');
        }).catch(err => {
            warningElement.classList.remove('setInvisible');
        });
    }

    render() {
        return <LoginWindowView onExitWindowButtonClick={this.onExitWindowButtonClick.bind(this)}
                                containerClass={this.state.containerClass}
                                onLoginButtonClick={this.onLoginButtonClick.bind(this)}
        />;
    }
}

const mapStateToProps = (state) => {
    return {
        applicationState: state.applicationState
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loginWindowState, loginUserState}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow);
