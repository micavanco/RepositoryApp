import React, { Component } from 'react';
import { connect } from "react-redux";
import TableView from "./TableView";
import { bindActionCreators } from "redux";
import { usersRepositories } from "../../../redux/actions/usersReposFetched";

class Table extends Component {

    constructor(params) {
        super(params);

        this.repositories = [];
        this.state = {pagination: 5, page: 1, isASC: true};
        this.pageFrom = 0;
        this.pageTo = 5;
        this.totalCount = 0;
        this.totalPages = 0;
        this.searchPage = 1;
        this.headerElement = null;
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
            const lastSearch = JSON.parse(localStorage.getItem('last-search'));
            localStorage.setItem('last-search',
                `{"name":"${lastSearch.name}"
            ,"page":${lastSearch.page}
            ,"searchPage":${(this.state.page - 1)}
            ,"pageFrom":${this.pageFrom}
            ,"pageTo":${this.pageTo}
            ,"pagination":${this.state.pagination}
            }`);
            if(this.pageFrom < (this.searchPage * 60) - 60) {
                this.searchPage--;
                this.props.usersRepositories(lastSearch.name, (lastSearch.page - 1), (this.state.page - 1));
                if(this.headerElement)
                    this.onTableHeaderClick(this.headerElement);
            }
            this.setState({page: --page});
        }
    }

    onChangePageRight() {
        let page = this.state.page;
        if(page < this.totalPages) {
            this.pageFrom += this.state.pagination;
            this.pageTo += this.state.pagination;
            const lastSearch = JSON.parse(localStorage.getItem('last-search'));
            localStorage.setItem('last-search',
                `{"name":"${lastSearch.name}"
            ,"page":${lastSearch.page}
            ,"searchPage":${(this.state.page + 1)}
            ,"pageFrom":${this.pageFrom}
            ,"pageTo":${this.pageTo}
            ,"pagination":${this.state.pagination}
            }`);
            if(this.pageTo > this.searchPage * 60) {
                this.searchPage++;
                this.props.usersRepositories(lastSearch.name, (lastSearch.page + 1), (this.state.page + 1));
                if(this.headerElement)
                    this.onTableHeaderClick(this.headerElement);
            }
            this.setState({page: ++page});
        }
    }

    sortTable(header) {
        let multiplier = 1;
        if(!this.state.isASC) multiplier = -1;
        if(header.id !== 'created_at')
            if(header.id === 'login')
                this.repositories.sort((a, b) => {
                    if(a['owner']['login'].toLowerCase() > b['owner']['login'].toLowerCase()) { return -1 * multiplier; }
                    if(a['owner']['login'].toLowerCase() < b['owner']['login'].toLowerCase()) { return multiplier; }
                    return 0;
                });
            else if(header.id === 'name')
                this.repositories.sort((a, b) => {
                    if(a[header.id].toLowerCase() > b[header.id].toLowerCase()) { return -1 * multiplier; }
                    if(a[header.id].toLowerCase() < b[header.id].toLowerCase()) { return multiplier; }
                    return 0;
                });
            else
                this.repositories.sort((a, b) => {
                    if(a[header.id] > b[header.id]) { return -1 * multiplier; }
                    if(a[header.id] < b[header.id]) { return multiplier; }
                    return 0;
                });
        else
            this.repositories.sort((a, b) => {
                if(new Date(a[header.id]).getTime() > new Date(b[header.id]).getTime()) { return -1 * multiplier; }
                if(new Date(a[header.id]).getTime() < new Date(b[header.id]).getTime()) { return multiplier; }
                return 0;
            });
    }

    onTableHeaderClick(e) {
        if(this.headerElement)
            this.headerElement.innerHTML = this.headerElement.innerHTML.split('<')[0];

        const header = e.target;
        if(header !== this.headerElement)
            this.setState({isASC: true});

        const arrow = this.state.isASC === true ? '<span>&#8659;</span>' : '<span>&#8657;</span>';
        header.innerHTML = header.innerHTML + arrow;

        this.sortTable(header);

        this.headerElement = header;
        this.setState({isASC: !this.state.isASC});
    }

    componentDidMount() {
        const lastSearch = JSON.parse(localStorage.getItem('last-search'));
        if(lastSearch) {
            this.pageFrom = lastSearch.pageFrom;
            this.pageTo = lastSearch.pageTo;
            this.searchPage = lastSearch.page;
            this.props.usersRepositories(lastSearch.name, lastSearch.page, lastSearch.searchPage);
            this.setState({pagination: lastSearch.pagination, page: lastSearch.searchPage});
        }
    }

    render() {
        if(this.props.repositories)
            if(this.props.repositories.data) {
                const arrayFrom = this.pageFrom - (this.searchPage - 1) * 60;
                const arrayTo = arrayFrom + this.state.pagination;
                this.repositories = this.props.repositories.data.items.slice(arrayFrom, arrayTo);
                if(this.headerElement)
                    this.sortTable(this.headerElement);
                this.totalCount = this.props.repositories.data.total_count;
                this.totalPages = Math.ceil(this.totalCount / this.state.pagination);
            }

        return <TableView repositories={this.repositories}
                          onSelectValueChanged={this.onSelectValueChanged.bind(this)}
                          pageFrom={this.pageFrom}
                          pageTo={this.pageTo}
                          total_count={this.totalCount}
                          onChangePageLeft={this.onChangePageLeft.bind(this)}
                          onChangePageRight={this.onChangePageRight.bind(this)}
                          onTableHeaderClick={this.onTableHeaderClick.bind(this)}
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
