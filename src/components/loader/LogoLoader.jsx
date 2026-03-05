import React from 'react';
import '@/styles/LogoLoader.css';
import LokmanyaIcon from '@/assets/images/icons/LokmanyaIcon';

const LogoLoader = ({ dark = false }) => {
    return (
        <div className={`logo-loader-overlay ${dark ? 'dark' : ''}`}>
            <div className="logo-loader-content">
                <div className="logo-loader-icon draw-svg">
                    <LokmanyaIcon />
                </div>
            </div>
        </div>
    );
};

export default LogoLoader;
