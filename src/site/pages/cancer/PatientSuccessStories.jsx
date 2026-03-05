import React from 'react'
import { CustomCarousel } from '../../components'
import { REVIEWS } from '../../../static-data'
import QuoteMark from "../../assets/images/quote-mark.webp";
// import './PatientSuccessStories.css'

function PatientSuccessStories() {
    return (
        <section className=' lok-network'>
            <h2 className="section-heading">Patient Success Stories</h2>
            <div id="review-carousel">
                <CustomCarousel id="review-carousel">
                    {REVIEWS.map(({ id, review, author }) => (
                        <div className="common-card" key={id}>
                            <img src={QuoteMark} alt="quotation" className="quote-mark" />
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
