import React, { Component } from 'react';
import SearchBox from "../components/MainView/SearchBox/SearchBox";
import Table from "../components/MainView/Table/Table";


export default class MainView extends Component {
    render = () => {
        return (
            <div className="main-view">
                <SearchBox/>
                <Table/>
            </div>
        );
    };
}
