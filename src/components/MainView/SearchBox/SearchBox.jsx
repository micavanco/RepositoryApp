import React, { Component } from 'react';
import SearchBoxView from "./SearchBoxView";

export default class SearchBox extends Component {

    constructor(params) {
        super(params);

        this.state = {containerClass: 'setInvisible'};
    }

    onLoginButtonClick() {
        this.setState({containerClass: ''});
    }

    render() {
        return <SearchBoxView onLoginButtonClick={this.onLoginButtonClick.bind(this)} containerClass={this.state.containerClass}/>;
    }

}
