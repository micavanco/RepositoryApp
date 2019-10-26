import React, { Component } from 'react';
import {connect} from "react-redux";
import TableView from "./TableView";
import {bindActionCreators} from "redux";
import {usersRepositories} from "../../../redux/actions/usersReposFetched";

class Table extends Component {

    constructor(params) {
        super(params);

        this.repositories = [];
        this.state = {pagination: 5, page: 1};
        this.pageFrom = 0;
        this.pageTo = 5;
        this.total_count = 0;
        this.total_pages = 0;
    }

    onSelectValueChanged(e) {
        this.pageTo = parseInt(this.pageFrom) + parseInt(e.target.value);
        this.setState({pagination: parseInt(e.target.value)})
    }

    onChangePageLeft() {
        let page = this.state.page;
        if(page > 1) {
            this.pageFrom -= this.state.pagination;
            this.pageTo -= this.state.pagination;
            this.setState({page: --page});
        }

    }

    onChangePageRight() {
        let page = this.state.page;
        if(page < this.total_pages) {
            this.pageFrom += this.state.pagination;
            this.pageTo += this.state.pagination;
            this.setState({page: ++page});
        }

    }

    render() {

        if(this.props.repositories)
            if(this.props.repositories.data) {
                this.repositories = this.props.repositories.data.items.slice(this.pageFrom, this.pageTo);
                this.total_count = this.props.repositories.data.total_count;
                this.total_pages = Math.floor(this.total_count / 30);
            }


        return <TableView repositories={this.repositories}
                          onSelectValueChanged={this.onSelectValueChanged.bind(this)}
                          pageFrom={this.pageFrom}
                          pageTo={this.pageTo}
                          total_count={this.total_count}
                          onChangePageLeft={this.onChangePageLeft.bind(this)}
                          onChangePageRight={this.onChangePageRight.bind(this)}
        />;
    }
}

const mapStateToProps = (state) => {
    return {
        repositories: state.repositories
    };
};

function mapDispatchToProps(dispatch) {

    return bindActionCreators({usersRepositories}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
