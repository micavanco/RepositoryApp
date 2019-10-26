import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {debounce, throttle} from 'throttle-debounce';

import { usersRepositories } from "../../../redux/actions/usersReposFetched";
import { loginWindowState } from "../../../redux/actions/loginWindowState";
import SearchBoxView from "./SearchBoxView";

class SearchBox extends Component {

    constructor(params) {
        super(params);

        this.onSearchRepositoryThrottled = debounce(1000, this.onGetData);
        this.props.loginWindowState('setInvisible');
    }

    onLoginButtonClick() {
        this.props.loginWindowState('');
    }

    onSearchRepository(e) {
        this.onSearchRepositoryThrottled(e.target.value);
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
