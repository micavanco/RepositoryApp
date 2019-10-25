import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { throttle } from 'throttle-debounce';

import { usersRepositories } from "../../../redux/actions/usersReposFetched";
import { loginWindowState } from "../../../redux/actions/loginWindowState";
import SearchBoxView from "./SearchBoxView";

class SearchBox extends Component {

    constructor(params) {
        super(params);

        this.state = { query: ''};
        this.onSearchRepositoryThrottled = throttle(1000, this.onGetData);
        this.props.loginWindowState('setInvisible');
    }

    onLoginButtonClick() {
        this.props.loginWindowState('');
    }

    onSearchRepository(e) {
        this.setState({query: e.target.value});
        this.onSearchRepositoryThrottled(this.state.query);
    }

    onGetData(name) {
            this.props.usersRepositories(name);
    }

    render() {
        return <SearchBoxView
            onLoginButtonClick={this.onLoginButtonClick.bind(this)}
            onSearchRepository={this.onSearchRepository.bind(this)}
        />;
    }

}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({usersRepositories, loginWindowState}, dispatch);
}

export default connect(null ,mapDispatchToProps)(SearchBox);
