import React from 'react'
import { REVIEWS } from '../../../static-data'
import QuoteMark from "../../assets/images/quote-mark.webp";
// import './PatientSuccessStories.css'
// import './service.css'
import { CustomCarousel } from '..';
import Image from 'next/image';


function PatientSuccessStories() {
    return (
        <section className=' lok-network'>
            <h2 className="section-heading">Patient Success Stories</h2>
            <div id="review-carousel">
                <CustomCarousel id="review-carousel">
                    {REVIEWS.map(({ id, review, author }) => (
                        <div className="common-card" key={id}>
                            <Image width={35} height={35} src={QuoteMark.src} alt="quotation" className="quote-mark" />
                            <p className="review">{review}</p>
                            <p className="author-name">{author}</p>
                        </div>
                    ))}
                </CustomCarousel>
            </div>
        </section>
    )
}

export default PatientSuccessStories
