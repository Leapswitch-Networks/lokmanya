// import Image from 'next/image';
import React from 'react'

const WhatsetsApartSection = ({ data }) => {
    return (
        <section className="technologies section-space side-space">
            <h2 className="section-heading text-white">{data.title}</h2>
            <div className="row g-md-4 g-3 justify-content-center">
                {data.items.map((item, index) => (
                    <div className="col-lg-4 col-sm-6" key={index}>
                        <div className="technology-card h-100">
                            <div className="d-flex gap-md-0 gap-2 align-items-md-start align-items-center flex-md-column flex-row">
                                <div className="icon">
                                    <img src={item.icon.src} alt={item.title} />
                                </div>
                                <h3 className="text-start">{item.title}</h3>
                            </div>
                            <p className="tech-desc mb-0">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhatsetsApartSection;