import React from 'react';
import Select from 'react-select';

const SelectField = ({ options, placeholder = 'Select options', onChange, ...props }) => {
  const handleChange = (selectedOptions) => {
    // Pass selected options to the onChange handler
    onChange(selectedOptions);
  };

  return (
    <Select
      {...props}
      options={options}
      placeholder={placeholder}
      isMulti={true} // Enable multi-select
      onChange={handleChange}
      closeMenuOnSelect={false} // Prevent closing the menu when selecting
    />
  );
};

export default SelectField;
