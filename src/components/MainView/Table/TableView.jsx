import React from 'react';
import './Table.scss';

const TableViewDisplay = () => {
    return (
        <div className="table">
            <table className="table__content">
                <thead className="table__content__row">
                    <tr>
                        <th className="table__content__row__header">ID</th>
                        <th className="table__content__row__header">Repo Title</th>
                        <th className="table__content__row__header">Owner</th>
                        <th className="table__content__row__header">Stars</th>
                        <th className="table__content__row__header">Created at</th>
                    </tr>
                </thead>
                <tbody className="table__content__row">
                    <tr>
                        <td className="table__content__row__data">Alfreds Futterkiste</td>
                        <td className="table__content__row__data">Maria Anders</td>
                        <td className="table__content__row__data">Germany</td>
                        <td className="table__content__row__data">Maria Anders</td>
                        <td className="table__content__row__data">Germany</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TableViewDisplay;
