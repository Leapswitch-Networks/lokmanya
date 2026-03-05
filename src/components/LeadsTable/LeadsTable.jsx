import React from 'react';
import "./lead.css"

const LeadsTable = ({ data }) => {
    return (
        <table className="leads-table">
            {/* <thead>
                <tr>
                    <th>Fields</th>
                    <th>Values</th>
                </tr>
            </thead> */}
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th>{item.label}</th>
                        <td>{item.value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export default LeadsTable;