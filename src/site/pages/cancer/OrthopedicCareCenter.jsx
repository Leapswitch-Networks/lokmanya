import React from 'react';
import Image1 from '../../../assets/images/Comprehensive Cancer Treatment.jpg';
import Image2 from '../../../assets/images/Expert Team.jpg';
// import Image3 from '../../../assets/images/State-of-the-Art Infrastructure.jpg';
import Image4 from '../../../assets/images/Personalized Care.jpg';
import Image5 from '../../assets/images/Affordable.webp';
// import Image6 from '../../../assets/images/7a03cc910fbe30f63dc19753962d73ae.png';

const treatments = [
    {
        title: 'Comprehensive Cancer Treatment',
        description: 'From early diagnosis to advanced therapies, we offer a full range of services, including surgery, chemotherapy, radiation, and targeted treatments.',
        image: Image1, // Replace with an appropriate image for this treatment
    },
    {
        title: 'Expert Team',
        description: 'Our team of highly skilled oncologists, surgeons, and support staff bring years of experience in treating various types of cancer, using the latest medical advancements.',
        image: Image2, // Replace with an appropriate image for this treatment
    },
    // {
    //     title: 'State-of-the-Art Infrastructure',
    //     description: 'We are equipped with cutting-edge technology, ensuring precise and effective treatment options for our patients.',
    //     image: Image3, // Replace with an appropriate image for this treatment
    // },
    {
        title: 'Personalized Care',
        description: 'At Lokmanya Hospitals, we focus on a holistic approach, providing emotional, nutritional, and psychological support throughout your treatment and recovery.',
        image: Image4, // Replace with an appropriate image for this treatment
    },
    {
        title: 'Affordable and Accessible',
        description: 'We believe in making high-quality cancer care accessible to all, without compromising on excellence.',
        image: Image5, // Replace with an appropriate image for this treatment
    }
];



function OrthopedicCareCenter() {
    return (
        <section className="orthopedic-care-container side-space section-space">
            <h2 className="section-heading">Why Choose Lokmanya Hospitals for Cancer Care?</h2>
            <div className="treatment-grid">
                {treatments.map((treatment, index) => (
                    <div key={index} className="treatment-card">
                        <div className='image-container'>
                            {treatment.image && (
                                <img src={treatment.image} alt={treatment.title} className="treatment-image" />
                            )}
                        </div>
                        <div className="treatment-content">
                            <h3 className="treatment-title">{treatment.title}</h3>
                            <p className="treatment-description">{treatment.description}</p>
                            {/* <a href="#" className="know-more-link">Know More &rarr;</a> */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default OrthopedicCareCenter;