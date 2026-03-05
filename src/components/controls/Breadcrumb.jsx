'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = ({
    dirIcon = ">",
}) => {
    const pathname = usePathname();
    const breadcrumb = pathname.split('/')?.slice(1)?.map(e => e.replaceAll('-', " "));

    return (
        <div className='breadcrumb-container'>
            {!!breadcrumb.length && (
                <>
                    <Link href="/">Home </Link>
                    {breadcrumb.map((e, i) => {
                        return (
                            <Link key={`${e}-${i}`} href={`/${breadcrumb?.slice(0, i + 1)?.map(e => e?.replaceAll(" ", '-'))?.join("/")}`}>
                                <span className='text-capitalize'>
                                    {dirIcon} {e?.replace(/\bdr\b /g, 'dr. ')}
                                </span>
                            </Link>
                        )
                    })}
                </>
            )}
        </div>
    )
}

export default Breadcrumb;
