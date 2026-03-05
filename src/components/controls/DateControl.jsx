import DatePicker from 'react-multi-date-picker'
import InputIcon from 'react-multi-date-picker/components/input_icon'

const DateControl = ({ width='100%', ...props }) => {
    const customStyle={
        width:width,
    }
    return (<>
        <label htmlFor=""style={{marginLeft:'12px'}} className='date-label'>{props.label}</label>
        <div className="date-wrapper" style={customStyle}>
            <DatePicker
                weekDays={["S", "M", "T", "W", "T", "F", "S"]}
                // render={<InputIcon/>}
                placeholder='Date'
                {...props}
            />
        </div>
    </>)
}

export default DateControl