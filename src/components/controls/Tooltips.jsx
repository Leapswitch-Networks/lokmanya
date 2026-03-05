import React from 'react'
import { Info } from '../../assets/images/icons'

const Tooltips = ({ content, ...props }) => {
    return (
        <span
            className="Custom_tooltip left"
            data-text={content}
        >
            <Info
                width={25}
                height={25}
                {...props}
            />
        </span>
    )
}

export default Tooltips