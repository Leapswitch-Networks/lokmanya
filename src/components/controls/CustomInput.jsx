import "./controls.css";

const CustomInput = ({ type, id, label, borderColor,  ...props }) => {
  const inputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor || 'transparent'
  }
  return (
    <div className="input-outer">
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type || "text"} id={id}  {...props} style={inputStyle} className="input-wrapper custom-input" />
    </div>
  );
};

export default CustomInput;
