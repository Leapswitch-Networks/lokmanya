import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

const BenifitTable = ({ data }) => {
    return (
        <div className='bnft-table'>
            <table className="table mb-0">
                <thead>
                    <tr className='bnft-tbl-ttl'>
                        <th><h4 className='mb-0'>Benefits</h4></th>
                        <th><h4 className='mb-0'>Lokmanya</h4></th>
                        {/* <th><h4 className='mb-0'>Others</h4></th> */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className='bnft-body-row' key={index}>
                            <td className='bnft-body-td ftw-600'>{item.benefit}</td>
                            <td className='bnft-body-td ftw-600 text-center'>
                                <span className={`icon-circle ${item.lokmanya ? 'green' : 'red'}`}>
                                    {item.lokmanya ? <FiCheck /> : <FiX />}
                                </span>
                            </td>
                            {/* <td className='bnft-body-td ftw-600 text-center'>
                                <span className={`icon-circle ${item.others ? 'green' : 'red'}`}>
                                    {item.others ? <FiCheck /> : <FiX />}
                                </span>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BenifitTable;
