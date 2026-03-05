import Link from 'next/link';
import React from 'react';

const BookCallSection = ({
    title = "",
    subtitle,
    primaryText = "",
    secondaryText = "",
    imageUrl,
    onPrimaryClick,
    onSecondaryClick,
    parentClass = '',
    parentClass2 = '',
    btn1Class = '',
    btn2Class = '',
    ...props
}) => {
    return (
        <div className='enquiry-meet-section'>
            <div className='enquiry-meet-inner bg-color-image position-relative'>
                <div className='row w-100 g-0'>
                    <div className={`${parentClass ? parentClass : 'col-xl-7'} col-lg-6`}>
                        <div className='enquiry-meet-ctnt'>
                            <h2 className='mb-md-3 mb-2 text-capitalize text-white'>{title}</h2>
                            {subtitle && <p className='mb-md-3 mb-2 text-white'>{subtitle}</p>}

                            <div className="d-flex gap-3 flex-wrap">
                                {
                                    onPrimaryClick &&
                                    <Link href="javascript:void(0)" className={`book-new-btn ${btn1Class}`} onClick={onPrimaryClick} {...props}>
                                        <span className={`${btn1Class}`}>{primaryText}</span>
                                    </Link>
                                }
                                {
                                    onSecondaryClick &&
                                    <Link href="javascript:void(0)" className={`book-two-new-btn ${btn2Class}`} onClick={onSecondaryClick} {...props}>
                                        <span className={`${btn2Class}`}>{secondaryText}</span>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`${parentClass2 ? parentClass2 : 'col-xl-5'} col-lg-6 d-flex justify-content-center d-lg-flex d-none`}>
                        <div className='enquiry-meet-img'>
                            <img src={imageUrl} crossOrigin="anonymous" alt="meet" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCallSection;
