import React from 'react';
import './WhyChooseSection.css';
// import Image from 'next/image';

function WhyChooseSection({ data }) {
    return (
        <section className='why-choose-section side-space section-space'>
            <h2 className="section-heading">{data.title}</h2>
            <h3 className="text-center">{data.subtitle}</h3>
            <p className='text-center' dangerouslySetInnerHTML={{ __html: data.description }}></p>
            <div className='row g-lg-4 g-3 justify-content-center'>
                {data.items.map((item, index) => (
                    <div className="col-md-6 col-sm-6" key={index}>
                        <div className='why-choose-section-card'>
                            <div className='row align-items-center flex-lg-row flex-column'>
                                <div className="col-lg-5 mb-lg-0 mb-2">
                                    <div className='why-choose-img'>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className='why-choose-section-ctnt'>
                                        <h4>{item.title}</h4>
                                        <p className='mb-0'>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default WhyChooseSection;