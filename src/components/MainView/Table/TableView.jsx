import React from 'react';
import './Table.scss';

const TableViewDisplay = ({repositories, onSelectValueChanged, pageFrom, pageTo, total_count, onChangePageLeft, onChangePageRight, onTableHeaderClick}) => {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    let username = '';
    if(credentials)
        username = credentials.username;
    return (
        <div className="table">
            <div className="table__nav">
                <select className="table__nav__select" onChange={onSelectValueChanged}>
                    <option value="5" defaultChecked>5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <div className="table__nav__pages">{pageFrom} - {pageTo} of {total_count}</div>
                <div className="table__nav__btn-left" onClick={onChangePageLeft}>&#10508;</div>
                <div className="table__nav__btn-right" onClick={onChangePageRight}>&#10509;</div>
            </div>
            <table className="table__content">
                <thead className="table__content__row">
                    <tr>
                        <th className="table__content__row__header" key="id" id="id" onClick={onTableHeaderClick}>ID</th>
                        <th className="table__content__row__header" key="name" id="name" onClick={onTableHeaderClick}>Repo Title</th>
                        <th className="table__content__row__header" key="owner" id="login" onClick={onTableHeaderClick}>Owner</th>
                        <th className="table__content__row__header" key="stargazers_count" id="stargazers_count" onClick={onTableHeaderClick}>Stars</th>
                        <th className="table__content__row__header" key="created_at" id="created_at" onClick={onTableHeaderClick}>Created at</th>
                    </tr>
                </thead>
                <tbody className="table__content__row">
                {
                    repositories.map((e, i) => {
                        let stylingRow = '';
                        if(username === e.owner.login)
                            stylingRow = 'user-repo';
                        return (
                            <tr className={stylingRow} key={i}>
                                <td className="table__content__row__data" key={i+'id'}>{e.id}</td>
                                <td className="table__content__row__data" key={i+'name'}>{e.name}</td>
                                <td className="table__content__row__data" key={i+'owner'}>{e.owner.login}</td>
                                <td className="table__content__row__data" key={i+'stars'}>{e.stargazers_count}</td>
                                <td className="table__content__row__data" key={i+'date'}>{e.created_at.split('T')[0]}</td>
                            </tr>
                        );
                    })
                }

                </tbody>
            </table>
        </div>
    );
};

export default TableViewDisplay;
