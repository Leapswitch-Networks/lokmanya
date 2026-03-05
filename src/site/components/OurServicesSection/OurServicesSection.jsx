// import Image from 'next/image';
import React from 'react';

const OurServicesSection = ({ data }) => {
    return (
        <section className="services-section section-space side-space">
            <h2 className='section-heading'>{data.title}</h2>
            <div className="row g-md-4 g-3">
                {data.items.map((item, index) => (
                    <div className="col-lg-4 col-sm-6" key={index}>
                        <div className="procedure-card">
                            <img src={item.imageUrl} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p className='mb-0'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OurServicesSection;
