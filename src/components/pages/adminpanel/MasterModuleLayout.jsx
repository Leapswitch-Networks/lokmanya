import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import "@/styles/mastermodule.css";

const MasterModuleLayout = ({ children, menu = [], basePath = '' }) => {
    const router = useRouter();
    const activeType = router.query.type;

    return (
        <div className='profile-container2 master-module-container'>
            <header className='edit-prof-header p-0'>
                <nav className='tab-nav'>
                    {menu.map((item, i) => (
                        <Link
                            href={`${basePath}/${item}`}
                            key={i}
                            aria-label={item}
                            className={`menu-tab ${activeType === item ? 'active' : ''}`}
                        >
                            <button
                                type='button'
                                className={`menu-tab ${activeType === item ? 'active' : ''}`}
                            >
                                {item}
                            </button>
                        </Link>
                    ))}
                </nav>
            </header>

            <div>{children}</div>
        </div>
    );
};

export default MasterModuleLayout;
