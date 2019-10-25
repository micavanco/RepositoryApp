import React, { Component } from 'react';
import LoginWindowView from "./LoginWindowView";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {usersRepositories} from "../../../redux/actions/usersReposFetched";
import {loginWindowState} from "../../../redux/actions/loginWindowState";


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

    render() {
        return <LoginWindowView onExitWindowButtonClick={this.onExitWindowButtonClick.bind(this)} containerClass={this.state.containerClass}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        applicationState: state.applicationState
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loginWindowState}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginWindow);
