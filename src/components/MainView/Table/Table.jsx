import React, { Component } from 'react';
import {connect} from "react-redux";
import TableView from "./TableView";
import {bindActionCreators} from "redux";
import {usersRepositories} from "../../../redux/actions/usersReposFetched";

class Table extends Component {

    constructor(params) {
        super(params);

        localStorage.setItem('last-search', '{"name":"", "page":1}');

        this.repositories = [];
        this.state = {pagination: 5, page: 1};
        this.pageFrom = 0;
        this.pageTo = 5;
        this.totalCount = 0;
        this.totalPages = 0;
        this.searchPage = 1;
    }

    onSelectValueChanged(e) {
        const page = Math.ceil(this.pageTo / parseInt(e.target.value));
        this.pageFrom = (page - 1) * parseInt(e.target.value);
        this.pageTo = this.pageFrom + parseInt(e.target.value);
        this.setState({pagination: parseInt(e.target.value), page: page});
    }

    onChangePageLeft() {
        let page = this.state.page;
        if(page > 1) {
            this.pageFrom -= this.state.pagination;
            this.pageTo -= this.state.pagination;
            if(this.pageFrom < (this.searchPage * 60) - 60) {
                const lastSearch = JSON.parse(localStorage.getItem('last-search'));
                this.searchPage--;
                this.props.usersRepositories(lastSearch.name, (lastSearch.page - 1));
            }
            this.setState({page: --page});
        }

    }

    onChangePageRight() {
        let page = this.state.page;
        if(page < this.totalPages) {
            this.pageFrom += this.state.pagination;
            this.pageTo += this.state.pagination;
            if(this.pageTo > this.searchPage * 60) {
                const lastSearch = JSON.parse(localStorage.getItem('last-search'));
                this.searchPage++;
                this.props.usersRepositories(lastSearch.name, (lastSearch.page + 1));
            }
            this.setState({page: ++page});
        }

    }

    render() {

        if(this.props.repositories)
            if(this.props.repositories.data) {
                const arrayFrom = this.pageFrom - (this.searchPage - 1) * 60;
                const arrayTo = arrayFrom + this.state.pagination;
                this.repositories = this.props.repositories.data.items.slice(arrayFrom, arrayTo);
                this.totalCount = this.props.repositories.data.total_count;
                this.totalPages = Math.floor(this.totalCount / 60);
            }

        return <TableView repositories={this.repositories}
                          onSelectValueChanged={this.onSelectValueChanged.bind(this)}
                          pageFrom={this.pageFrom}
                          pageTo={this.pageTo}
                          total_count={this.totalCount}
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
