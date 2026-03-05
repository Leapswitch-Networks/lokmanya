import React from 'react'
const PrimaryButton = ({ children, type, width, background, textTransform,fontFamily,padding, ...props }) => {
  return (
    <button type={type || 'button'} className='primary-button' aria-label="primary-button" {...props}>{children}</button>
  )
}

export default PrimaryButton