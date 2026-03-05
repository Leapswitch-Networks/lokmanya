import React from 'react'
import { useMemo } from 'react';
import Select from 'react-select'
// export const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     boxShadow: state.isFocused ? "none" : provided.boxShadow,
//     borderColor: state.isFocused ? "transparent" : provided.borderColor,
//     "&:hover": {
//       borderColor: state.isFocused ? "transparent" : provided.borderColor,
//     },
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isSelected ? "#0094cd" : state.isFocused ? "#deebff" : "",
//     "&:hover": {
//       backgroundColor: state.isSelected ? "#0094cd" : "#deebff",
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//   }),
// };


const Filter = ({ placeholder, height, width, maxWidth, minWidth, defaultValue, inputRef, option = [], ...props }) => {
  const filterStyle = {
    width: width || '100%',
    height: height || '40px',
    maxWidth: maxWidth || "200px",
    control: (provided, state) => ({
      ...provided,
      width: width || '100%',
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      borderColor: state.isFocused ? "#cccccc" : provided.borderColor,
      flexWrap: 'nowrap',
      "&:hover": {
        borderColor: state.isFocused ? "#cccccc" : provided.borderColor,
      },
    }),
    singleValue: (provided) => ({
      ...provided,
    }),
    option: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: state.isSelected ? "#0094cd" : state.isFocused ? "#deebff" : "",
      "&:hover": {
        backgroundColor: state.isSelected ? "#0094cd" : "#deebff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    placeholder: (provided) => ({
      ...provided,
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),
  }
  const customComponents = {
    IndicatorSeparator: () => null,
  };
  const optionsWithDefault = useMemo(() => [defaultValue, ...option], [defaultValue, option]);
  return (
    <Select
      ref={inputRef}
      options={optionsWithDefault}
      className="filter"
      components={customComponents}
      styles={filterStyle}
      placeholder={placeholder || 'Select'}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export default Filter