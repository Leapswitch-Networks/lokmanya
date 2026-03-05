export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    boxShadow: state.isFocused ? "none" : provided.boxShadow,
    borderColor: state.isFocused ? "transparent" : provided.borderColor,
    "&:hover": {
      borderColor: state.isFocused ? "transparent" : provided.borderColor,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
  }),
  option: (provided, state) => ({
    ...provided,
    width:'100%',
    backgroundColor: state.isSelected ? "#2E5386" : state.isFocused ? "#2e5386ba" : "",
    "&:hover": {
      backgroundColor: state.isSelected ? "#2E5386" : "#2e5386ba",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};
