import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { throttle } from 'throttle-debounce';

import { usersRepositories } from "../../../redux/actions/usersReposFetched";
import SearchBoxView from "./SearchBoxView";

class SearchBox extends Component {

    constructor(params) {
        super(params);

        this.state = {containerClass: 'setInvisible'};
        this.onSearchRepositoryThrottled = throttle(400, this.onGetData);
    }

    onLoginButtonClick() {
        this.setState({containerClass: ''});
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
            containerClass={this.state.containerClass}
            onSearchRepository={this.onSearchRepository.bind(this)}
        />;
    }

}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({usersRepositories}, dispatch);
}

export default connect(null ,mapDispatchToProps)(SearchBox);
