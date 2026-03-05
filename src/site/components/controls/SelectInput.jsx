import React, { useMemo } from 'react';
// import { ArrowDown } from '../../assets/images/icons';
import Select from 'react-select'

const SelectInput = ({ placeholder, height, width, maxWidth, minWidth, defaultValue, inputRef, option = [], ...props }) => {
  const filterStyle = {
    width: width || '100%',
    height: height || '40px',
    maxWidth: maxWidth || "200px",
    // minWidth: minWidth || "120px",
    flexWrap: 'nowrap',
    control: (provided) => ({
      ...provided,
      width: width || '100%',
      cursor: 'pointer',
    }),
  }
  const customComponents = {
    IndicatorSeparator: () => null,
  };
  const optionsWithDefault = useMemo(() => [defaultValue, ...option], [defaultValue, option]);
  return (
    // <div className='select-input w-100'>
    //   <select {...props} autoComplete="off" role="presentation">
    //     <option value="">{placeHolder}</option>
    //     {options.length > 0 ? options?.map(option => (
    //       <option key={option}  value={option.value}>
    //         {option.label}
    //       </option>
    //     )) : null}
    //   </select>
    //   <ArrowDown />
    // </div>
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
  );
};

export default SelectInput;
