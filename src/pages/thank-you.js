import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumb from '@/components/controls/Breadcrumb';

const ThankYouPage = () => {
    const router = useRouter();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (router?.query?.data) {
            try {
                setData(JSON.parse(router.query.data));
            } catch (e) {
                console.error("Invalid data format");
            }
        }
    }, [router.query]);

    return (
        <div className='d-flex text-center container w-100 border align-items-center justify-content-center p-2 my-3'>
            <div className="">
                <div className="logo-sec d-flex justify-content-center w-100 mb-md-3 mb-3">
                    <Link href="/"> <img
                        src="/images/new-theme/lokmanya-new-png-logo.webp"
                        alt="app logo"
                    /></Link>
                </div>
                {
                    data &&
                    <div className="">
                        <div className="">
                            <span>Location: {data?.city?.label}</span>
                        </div>
                        <div className="">
                            <span>Hospital: {data?.area?.label}</span>
                        </div>
                        <div className="">
                            <span>Full Name: {data?.name}</span>
                        </div>
                        <div className="">
                            <span>Phone: {data?.mobile}</span>
                        </div>
                        <div className="">
                            <span>Message: {data?.message}</span>
                        </div>
                    </div>
                }

                <div className="">
                    <span>Thank you for the enquiry. Our team will soon get in touch with you.</span>
                </div>
                <div className="">
                    <Breadcrumb dirIcon="/" />
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;
