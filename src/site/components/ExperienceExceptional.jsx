import React from 'react';

const ExperienceExcellence = ({ data }) => {

    return (
        <div className='exp-exc-wrapper'>
            {/* Desktop View */}
            <div className='row align-items-center d-none d-xl-flex'>
                <div className="col-xl-4">
                    {data.content.filter(item => item.position === "left").map(item => (
                        <div key={item.id} className={`${item.className} exp-exc-left-ctnt`}>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>

                <div className="col-xl-4 d-flex flex-column align-items-center">
                    <div className="exp-exc-mid">
                        {
                            data.middleImage.map((img) => (
                                <img
                                    className="w-100 h-100 exp-exc-mid-main"
                                    src={img.img}
                                    loading="lazy"
                                    alt="" />
                            ))
                        }
                        {data.middleIcons.map((icon, index) => (
                            <img key={index}
                                className={`svg-circle ${icon.className}`}
                                src={icon.icon}
                                alt="" />
                        ))}
                    </div>
                </div>

                <div className="col-xl-4">
                    {data.content.filter(item => item.position === "right").map(item => (
                        <div key={item.id} className={`${item.className} exp-exc-right-ctnt`}>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile View */}
            <div className='row align-items-center d-xl-none d-flex'>
                <div className="col-12 mb-3">
                    <div className='exp-exc-mobile-img'>
                        {
                            data.middleImage.map((img) => (
                                <img
                                    className="w-100 h-100 exp-exc-mid-main"
                                    src={img.img}
                                    loading="lazy"
                                    alt="" />
                            ))
                        }
                    </div>
                </div>
                <div className="col-12">
                    <div className='row g-4'>
                        {data.content.map(item => (
                            <div key={item.id} className="col-md-6">
                                <div className='exp-exc-mobile-ctnt d-flex align-items-center gap-3'>
                                    <img className="exp-exc-mobile-svg"
                                        src={item.icon}
                                        alt="" />
                                    <h4 className='mb-0'>{item.title}</h4>
                                </div>
                                <p className='m-0 mt-2'>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceExcellence;
