import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { debounce } from 'throttle-debounce';

import { usersRepositories } from "../../../redux/actions/usersReposFetched";
import { loginWindowState } from "../../../redux/actions/loginWindowState";
import { loginUserState } from "../../../redux/actions/loginUserState";
import SearchBoxView from "./SearchBoxView";

class SearchBox extends Component {

    constructor(params) {
        super(params);

        this.onSearchRepositoryThrottled = debounce(1000, this.onGetData);
        this.props.loginWindowState('setInvisible');
        this.props.loginUserState(false);
    }

    onLoginButtonClick() {
        if(this.props.userState) {
            localStorage.removeItem('credentials');
            this.props.loginUserState(false);
        }else
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
            userState={this.props.userState}
        />;
    }

}

const mapStateToProps = (state) => {
    return {
        userState: state.userState
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({usersRepositories, loginWindowState, loginUserState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
