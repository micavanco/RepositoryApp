import React, { Component } from 'react';
import LoginWindowView from "./LoginWindowView";


export default class LoginWindow extends Component {

    constructor(params) {
        super(params);
        this.state = {containerClass: this.props.containerClass};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps !== this.props)
            this.setState({
                containerClass: this.props.containerClass
            });
    }

    onExitWindowButtonClick() {
        this.setState({
            containerClass: 'setInvisible'
        });
    }

    render() {
        return <LoginWindowView onExitWindowButtonClick={this.onExitWindowButtonClick.bind(this)} containerClass={this.state.containerClass}/>;
    }
}
