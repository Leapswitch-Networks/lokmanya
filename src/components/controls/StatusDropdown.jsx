import React from 'react'
import Select from 'react-select'
import { color } from '../../assets/constant';

const StatusDropdown = ({ options, width, height, ...props }) => {

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: width || 100,
            textAlign: 'center',
            border: `1px solid ${color.colorPrimary}`,
            borderRight: 'none',
            borderRadius: '20px 0 0 20px',
            boxShadow: '#f8f8f8',
            color: "#000",
            borderColor: "transparent",
            cursor: 'pointer',
            justifyContent: 'space-between',
            gap: '0px',
            padding: '0 5px 0 2px',
            position: 'relative',
            textTransform: 'capitalize',
            '&:hover': {
                borderColor: 'none'
            },
        }),

        option: (provided, state) => ({
            ...provided,
            fontWeight: '500',
            fontSize: '13px',
            width: width || '100%',
            backgroundColor: state.isSelected ? color.colorPrimary : 'white',
            color: state.isSelected ? '#fff' : '#000',
            '&:active': {
                background: color.colorPrimary,
                color: '#fff'
            },
            '&:hover': {
                background: color.colorPrimary,
                color: '#fff',
                cursor: 'pointer'
            }
        }),
        singleValue: (provided) => ({
            ...provided,
            fontWeight: '500',
        }),
    };

    return (
        <Select
            className='user-access-dropdown'
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => <svg xmlns="http://www.w3.org/2000/svg" fill='#898989' height={20} width={20} id="dropdown" x="0" y="0" version="1.1" viewBox="0 0 29 29" ><path d="M14.5 27.065a12.465 12.465 0 0 1-8.839-3.655c-4.874-4.874-4.874-12.804 0-17.678 2.361-2.361 5.5-3.662 8.839-3.662s6.478 1.3 8.839 3.662c4.874 4.874 4.874 12.804 0 17.678a12.465 12.465 0 0 1-8.839 3.655zm0-22.995a10.43 10.43 0 0 0-7.425 3.076c-4.093 4.094-4.093 10.755 0 14.85 4.094 4.093 10.755 4.093 14.85 0 4.093-4.094 4.093-10.755 0-14.85A10.434 10.434 0 0 0 14.5 4.07zm8.132 18.633h.01-.01z"></path><path d="M14.5 17.869a.997.997 0 0 1-.707-.293L9.197 12.98a.999.999 0 1 1 1.414-1.414l3.889 3.889 3.889-3.889a.999.999 0 1 1 1.414 1.414l-4.596 4.596a.997.997 0 0 1-.707.293z"></path></svg>
            }}
            menuPortalTarget={document.body}
            menuPlacement='bottom'
            styles={customStyles}
            menuClassName={'custom-menu-styles'}
            options={options?.map((option) => ({
                ...option,
            }))}
            isSearchable={false}
            {...props}
        />
    )
}

export default StatusDropdown