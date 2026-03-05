import React, { useState } from 'react';
import './WhyChooseSection/WhyChooseSection.css';
import ItemDescriptionModal from './ItemDecriptionModal';
import Image from 'next/image';

function CompCareSection({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleReadMore = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

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
                                        <Image width={225} height={255} src={`/uploads/hyperlocal/compCare/${item.image}`} alt={item.title} />
                                        {/* <img src={`/uploads/hyperlocal/compCare/${item.image}`} alt={item.title} /> */}
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className='why-choose-section-ctnt'>
                                        <h4>{item.title}</h4>
                                        <p className='mb-0 comp-sec-desc'>{item.description}</p>
                                        <button className="btn btn-link p-0" onClick={() => handleReadMore(item)}>
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ItemDescriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={selectedItem}
            />
        </section>
    );
}

export default CompCareSection;
