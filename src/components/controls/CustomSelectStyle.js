import { color } from '../../assets/constant';

const CustomSelectStyle = (width, control) => ({
    control: (provided) => ({
        ...provided,
        width: width || '70px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '20px',
        flexWrap:'nowrap',
        boxShadow: '#f8f8f8',
        color: "#000",
        height: '40px',
        borderColor: "transparent",
        padding: "0 5px",
        cursor: 'pointer',
        '&:hover': {
            borderColor: color.colorPrimary
        },
        ...control
    }),

    option: (provided, state) => ({
        ...provided,
        fontWeight: '500',
        fontSize: '13px',
        width: '100%',
        whiteSpace: 'nowrap',
        flexWrap:'nowrap',
        backgroundColor: state.isSelected ? color.colorPrimary : 'white',
        color: state.isSelected ? '#fff' : '#000',
        '&:active': {
            background: color.colorPrimary,
            color: '#f00'
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
    menu: provided => ({
        ...provided,
        minWidth: width || '70px',
        width: 'fit-content', // Set the width to 100%
    }),
});


export default CustomSelectStyle