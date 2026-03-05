import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const HeaderSkeleton = () => {
  return (
    <div className="header-profile-sec">
        <Skeleton circle height={40} width={40} />
        <div className="user-info">
            <Skeleton height={20} width={'100%'} />
            <Skeleton height={20} width={'100%'} />
        </div>
    </div>
  );
};

export default HeaderSkeleton;
