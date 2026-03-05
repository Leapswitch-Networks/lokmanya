import React from 'react'

// const Image = ({ image, height, width, alt, src, ...props }) => {
//     return (
//         (src || image) ?
//             <img src={src || `${process.env.REACT_APP_FILE_BASE_URL}/${image}`} height={height || 40} width={width || 40} crossOrigin='anonymous' alt={alt || "Profile_picture"} {...props} />
//             :
//             <img src={"https://tse4.mm.bing.net/th?id=OIP.FjSRywv2jSoO2kdlijRZ4gHaHa&pid=Api&P=0"} height={height || 40} width={width || 40} alt={alt || "Profile_picture"} {...props} />
//     )
// }

const Image = ({ image, height, width, alt, src, ...props }) => {
    // Check if the image prop contains a Base64 string
    const imageSrc = image && (image.startsWith('data:image/') ? image : `${process.env.REACT_APP_FILE_BASE_URL}/${image}`);
    
    return (
        <img
            src={src || imageSrc}
            height={height || 40}
            width={width || 40}
            crossOrigin='anonymous'
            alt={alt || "Profile_picture"}
            {...props}
        />
    );
};

export default Image