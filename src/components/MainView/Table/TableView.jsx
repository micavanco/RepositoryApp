import React from 'react';
import './Table.scss';

const TableViewDisplay = ({repositories}) => {
    return (
        <div className="table">
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
