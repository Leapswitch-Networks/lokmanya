import React from "react";

const CustomSelect = ({options=[],defaultOption='Select',label,placeholder,...props}) => {
  return (
    <>
     {label && <label htmlFor="treatment" className="form-label">
         <label htmlFor=""></label>
       </label>
     }
      <select
        className="custom-select"
        placeholder={placeholder}
        {...props}
      >
        <option value="">{defaultOption}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default CustomSelect;
