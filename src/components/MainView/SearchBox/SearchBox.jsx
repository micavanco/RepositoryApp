import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { debounce } from 'throttle-debounce';

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

    onGetData(name, page = 1, searchPage = 1) {
        this.props.usersRepositories(name, page, searchPage);
    }

    componentDidMount() {
        const lastSearch = JSON.parse(localStorage.getItem('last-search'));
        if(lastSearch) {
            document.querySelector('.search-box__input').value = lastSearch.name;
            this.onGetData(lastSearch.name, lastSearch.page, lastSearch.searchPage);
        }
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
