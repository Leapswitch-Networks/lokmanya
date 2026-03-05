// CustomMarquee.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';

const CustomMarquee = ({ children,...props }) => {
  return (
      <Marquee speed={50}  gradient={false} pauseOnHover {...props}>
        {children}
      </Marquee>
  );
};

export default CustomMarquee;
