import React, { Component } from 'react';
import {connect} from "react-redux";
import TableView from "./TableView";

class Table extends Component {

    constructor(params) {
        super(params);

        this.repositories = [];
    }

    render() {
        console.log(this.props.repositories);
        if(this.props.repositories)
            if(this.props.repositories.data)
                this.repositories = this.props.repositories.data.items;

        return <TableView repositories={this.repositories}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: state.repositories
    };
};

export default connect(mapStateToProps)(Table);
