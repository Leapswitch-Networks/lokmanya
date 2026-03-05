import React, { useState } from "react";
import "./controls.css";
import { InValid, Valid, View } from "../../assets/images/icons";
import { ClipLoader } from "react-spinners";
import { color } from "../../assets/constant";

const InputField = ({
  type,
  id,
  error,
  label,
  icon,
  valid,
  onFocus = () => { },
  loading,
  isPass,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="input-outer">
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        <input type={isPass && !showPassword ? "password" : "text"} id={id} onFocus={() => {
          onFocus();
          setIsFocused(true);
        }} onBlur={() => {
          onFocus();
          setIsFocused(false);
        }} {...props} />
        {isPass ? (
          <button
            type="button"
            aria-label="hide_show"
            onClick={() => setShowPassword((prev) => !prev)}
            className="btn-hide-pass"
          >
            <View width={20} height={20} />
            <div className={`line ${showPassword ? "" : "hide-line"}`}></div>
          </button>
        ) : loading ? (
          <ClipLoader color={color.colorPrimary} loading={loading} size={20} />
        ) : !loading && valid == 2 ? null : valid ? (
          <Valid />
        ) : (
          <InValid />
        )}
      </div>
      {error && (
        <span
          style={{
            color: 'red',
            paddingLeft: 20,
            fontSize: 16,
          }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
