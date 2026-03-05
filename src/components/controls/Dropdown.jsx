import React from 'react';

const Dropdown = ({ options = [], defaultOption = 'select', label, ...props }) => {
  return (
    <>
      {label && <label style={{ marginBottom: '5px', marginLeft: '15px' }}>{label}</label>}
      <div className="custom-dropdown">
        <select {...props}>
          <option value="">{defaultOption} {options.length > 0 ? ` ${options[0].type}` : ''}</option>
          {options.map(option => (
            <option key={option?.masterName} value={option?.masterName}>{option?.masterName}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Dropdown;
