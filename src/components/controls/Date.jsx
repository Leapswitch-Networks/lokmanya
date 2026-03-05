import React from 'react'
import DatePicker from "react-multi-date-picker";
import './controls.css'
import InputIcon from "react-multi-date-picker/components/input_icon"

const Date = ({ showTime, label, id, ...props }) => {
    return (<>
        <label className="label" htmlFor={id}>{label || 'Select'}</label>
        <div className="date-wraper">
            <DatePicker
                render={<InputIcon />}
                inputClass="custom-input"
                id={id}
                isClearable={true}
                {...props}
            />
        </div>
    </>
    )
}

export default Date