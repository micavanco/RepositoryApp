import React, { Component } from 'react';
import SearchBoxView from "./SearchBoxView";

export default class SearchBox extends Component {

    constructor(params) {
        super(params);

    }

    onLoginButtonClick() {
        document.querySelector('.login-box').classList.remove('setInvisible');
    }

    render() {
        return <SearchBoxView onLoginButtonClick={this.onLoginButtonClick}/>;
    }

}
