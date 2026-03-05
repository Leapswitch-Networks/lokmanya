import React from 'react';
import "./Whenconsultsection.css"
// import Image from 'next/image';

const WhenConsultSection = ({ data }) => {
    return (
        <section className="section-space side-space">
            <h2 className="section-heading">{data.title}</h2>
            <div className="row g-md-4 g-4 justify-content-center mt-1">
                {data.items.map((item, index) => (
                    <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
                        <div className="text-center">
                            <img src={item.image} alt={item.title} className="consultation-image" />
                            <h4 className="">{item.title}</h4>
                            <p className='mb-0'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhenConsultSection;
