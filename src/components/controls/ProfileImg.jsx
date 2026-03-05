import React from 'react'
import Defaultprof from '../../assets/images/defaultprof';

const ProfileImg = ({ local, CustomClass, gender, image, height, width, alt, src, Imgref, ...props }) => {

    if (image) return <img src={local ? image : `${process.env.REACT_APP_FILE_BASE_URL}/${image}`} crossOrigin="anonymous" type="image/webp" height={height || 40} width={width || 40} alt={alt || "Profile_picture"} className={` ${CustomClass} prof-img `} ref={Imgref} {...props} />;

    return <Defaultprof gender={gender} />
}

export default ProfileImg