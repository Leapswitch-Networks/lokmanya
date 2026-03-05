import React from 'react'
// import { VerifyIcon } from '../../assets/images/icons'
import { PrimaryButton } from '../../components'
import Link from 'next/link'

const NotFound = () => {
    return (
        <div className="login-wrapper not-found sidespace">
            <div className="login-outer" style={{ height: '400px', minHeight: '200px' }}>
                <div className="login-inner text-center  align-align-items-center justify-content-center d-flex-column " >
                    <div className="login-logo">
                        <h4 style={{ fontSize: '80px' }}>404</h4>
                        <h1 className="text-3xl font-semibold mb-4">Page Not Found</h1>
                        <p style={{ fontSize: '20px' }}>Oops! The page you're looking for doesn't exist.</p>
                    </div>
                     <Link href="/" aria-label='goHome' className='hover:underline'><PrimaryButton>Go Home</PrimaryButton></Link>
                </div>

            </div>
        </div>
    )
}

export default NotFound