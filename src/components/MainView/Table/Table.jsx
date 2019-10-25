import React, { Component } from 'react';
import {connect} from "react-redux";
import TableView from "./TableView";

class Table extends Component {

    constructor(params) {
        super(params);

        this.repositories = [];
        this.state = {pagination: 5, page: 1};
        this.pageFrom = 0;
        this.pageTo = 5;
    }

    onSelectValueChanged(e) {
        this.pageTo = e.target.value;
        this.setState({pagination: e.target.value})
    }

    render() {

        if(this.props.repositories)
            if(this.props.repositories.data)
                this.repositories = this.props.repositories.data.items.slice(this.pageFrom, this.pageTo);

        return <TableView repositories={this.repositories} onSelectValueChanged={this.onSelectValueChanged.bind(this)}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: state.repositories
    };
};

export default connect(mapStateToProps)(Table);
