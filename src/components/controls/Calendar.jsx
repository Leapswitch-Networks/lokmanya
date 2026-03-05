import DatePicker from "react-multi-date-picker";
import './controls.css'
import { CalendarIcon } from "../../assets/images/icons";
import { useRef } from "react";

const Calendar = ({ showTime, ...props }) => {
    const datePickerRef = useRef()
    return (
    <label className="icon-wrapper">
         <DatePicker
                weekDays={["S", "M", "T", "W", "T", "F", "S"]}
                editable={false}
                id={'cal'}
                ref={datePickerRef} 
                style={{width:'0',opacity:0}}
                {...props}  
                aria-label="calendar"
                           
            />
            <CalendarIcon onClick={() => datePickerRef.current.openCalendar()} className='calendar-icon' height="25px" width="25px"/>
         </label>
    )
}


export default Calendar
