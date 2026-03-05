import React from 'react';
import Counter from '../Counter/Counter';

const HospitalCounterSection = ({ data }) => {
    return (
        <div className='hospital-counter-section'>
            <div className='hospital-counter-main'>
                <div className='row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 g-xl-0 g-lg-4 g-md-4 g-3'>
                    {data.map((item, index) => (
                        <div className='col' key={index}>
                            <div className='counter-inner-line'>
                                <div>
                                    <Counter
                                        className='hospital-counter'
                                        targetValue={item.value}
                                        duration={2000}
                                        usePlusSign={true}
                                    />
                                    <p className='mb-0 text-white'>{item.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HospitalCounterSection;
