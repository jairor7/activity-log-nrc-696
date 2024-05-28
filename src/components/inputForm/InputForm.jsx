import { DatePicker, Input } from "antd";
import React from "react";

const InputForm = ({
  id,
  label,
  onChangeInput,
  onBlurInput,
  value,
  error,
  isPassword = false,
  isDate = false,
}) => {
  const propsInput = {
    id,
    onChange: onChangeInput,
    onBlur: onBlurInput,
    value,
  };
  return (
    <div>
      <span>{label}:</span>
      {isPassword ? (
        <Input.Password {...propsInput} />
      ) : isDate ? (
        <DatePicker className="date-picker" {...propsInput} />
      ) : (
        <Input {...propsInput} />
      )}
      {error && <p className="span-error">{error}</p>}
    </div>
  );
};

export default InputForm;
