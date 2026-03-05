import Link from 'next/link';
import React from 'react';
import "@/site/components/component.css";
import Image from 'next/image';

const locationData = [
    {
        img: "/images/locations/1.webp",
        alt: "Location 1",
        title: "SB Road- Pune",
        link: "https://maps.app.goo.gl/Q2Z28tos9CAHPBSx8"
    },
    {
        img: "/images/locations/4.webp",
        alt: "Location 2",
        title: "Nigdi, PCMC- Pune",
        link: "https://maps.app.goo.gl/V4Vuyho1VxP38Eci9"
    },
    {
        img: "/images/locations/2.webp",
        alt: "Location 3",
        title: "Chinchwad, PCMC- Pune",
        link: "https://maps.app.goo.gl/ytC3hg2Ksaxs768B7"
    },
    {
        img: "/images/locations/3.webp",
        alt: "Location 4",
        title: "Swargate- Pune",
        link: "https://maps.app.goo.gl/FpX5pJFbTEtcoDzd9"
    },
    // Uncomment below to enable the 5th location
    // {
    //     img: "/images/locations/5.webp",
    //     alt: "Location 5",
    //     title: "Kolhapur",
    //     link: "https://maps.app.goo.gl/bcUyeot2LeKReHh7A"
    // }
];

const OurLocation = () => {
    return (
        <div id='locations' className=''>
            <h2 className="section-heading">Our Locations</h2>
            <div className="row justify-content-center g-3">
                {locationData.map((loc, index) => (
                    <div key={index} className="col-lg-3 col-md-6 col-6">
                        <Link href={loc.link}
                            target="_blank">
                            <div className="locations-card">
                                <Image width={273} height={200}
                                    src={loc.img}
                                    alt={loc.alt}
                                />
                                <div className="locations-card-body">
                                    <h5 className="card-title text-start">{loc.title}</h5>
                                    <div
                                        className="text-start"
                                    >
                                        <i className='text-decoration-underline'>Get Directions</i>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default OurLocation