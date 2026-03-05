import React from 'react'

const Button = ({ children, type, Ref, ...props }) => {
    return (
        <button type={type || 'button'} ref={Ref} {...props}>{children}</button>
    )
}

export default Button