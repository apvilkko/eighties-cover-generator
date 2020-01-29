import React from "react";

const LabeledInput = ({ id, label, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input type={type || "text"} id={id} onChange={onChange} value={value} />
    </div>
  );
};

export default LabeledInput;
