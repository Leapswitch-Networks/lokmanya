import React from 'react'
import { useRouter } from 'next/router';
import { BackIcon } from '../../assets/images/icons'

const GoBack = ({ to = -1, ...props }) => {
    let navigate = useRouter();
    return (
        <button type='button' aria-label="go-back" onClick={() => to === -1 ? navigate.back() : navigate.push(to)}>
            <BackIcon {...props} />
        </button>
    )
}

export default GoBack