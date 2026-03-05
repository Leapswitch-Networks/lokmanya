import React from 'react'

const CommonInput = ({type='text',placeholder='',...props}) => {
  return (
    <input type={type} className='common-input' placeholder={placeholder} {...props} required/>
  )
}

export default CommonInput