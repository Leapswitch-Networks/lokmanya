// import Image from 'next/image'
import React from 'react'

const ConditionsTreatSection = ({ data }) => {
    return (
        <section className="conditionsTreat section-space side-space">
            <h2 className='section-heading'>{data.title}</h2>
            <p className='section-heading'>{data.subtitle}</p>
            <div className="row g-md-4 g-4 justify-content-center mt-1">
                {data.items.map((condition, index) => (
                    <div className="col-xl-4 col-md-6 col-sm-6" key={index}>
                        <div className="technology-card gap-3" key={index}>
                            <div className="icon" style={{ height: "51px" }}>
                                <img src={condition.icon.src} className='h-100' alt={condition.title} />
                            </div>
                            <h4 className='mb-0'>{condition.title}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ConditionsTreatSection
