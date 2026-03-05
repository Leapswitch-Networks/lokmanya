import "./controls.css";

const TextInput = ({ borderColor,background, ...props }) => {
  const inputStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    height:'40px',
    borderColor: borderColor || '#1A1A1A1A',
    backgroundColor:background || "#fff",
    padding:'0 20px'
  }
  return (
      <input style={inputStyle} className="text-input" {...props} />
  );
};

export default TextInput;
