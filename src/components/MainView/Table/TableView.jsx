import React from 'react';
import './Table.scss';

const TableViewDisplay = ({repositories, onSelectValueChanged}) => {
    return (
        <div className="table">
            <div className="table__nav">
                <select className="table__nav__select" onChange={onSelectValueChanged}>
                    <option value="5" defaultChecked>5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <div className="table__nav__pages">{} - {} of {}</div>
                <div className="table__nav__btn-left">&#10508;</div>
                <div className="table__nav__btn-right">&#10509;</div>
            </div>
            <table className="table__content">
                <thead className="table__content__row">
                    <tr>
                        <th className="table__content__row__header" key="id">ID</th>
                        <th className="table__content__row__header" key="title">Repo Title</th>
                        <th className="table__content__row__header" key="owner">Owner</th>
                        <th className="table__content__row__header" key="stars">Stars</th>
                        <th className="table__content__row__header" key="date">Created at</th>
                    </tr>
                </thead>
                <tbody className="table__content__row">
                {
                    repositories.map((e, i) => {
                        return (
                            <tr key={i}>
                                <td className="table__content__row__data" key={i+'id'}>{e.id}</td>
                                <td className="table__content__row__data" key={i+'name'}>{e.name}</td>
                                <td className="table__content__row__data" key={i+'owner'}>{e.owner.login}</td>
                                <td className="table__content__row__data" key={i+'stars'}>{e.stargazers_count}</td>
                                <td className="table__content__row__data" key={i+'date'}>{e.created_at}</td>
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
