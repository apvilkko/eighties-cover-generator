import React, { useCallback } from "react";
import LabeledInput from "./LabeledInput";

const Inputs = ({ onChange, data }) => {
  const changeHandler = useCallback(
    field => evt => {
      const value = evt.target.value;
      onChange(val => ({
        ...val,
        [field]: value
      }));
    },
    [onChange]
  );

  return (
    <div className="inputs">
      {["artist", "title"].map(field => (
        <LabeledInput
          key={field}
          label={field}
          onChange={changeHandler(field)}
          value={data[field]}
        />
      ))}
    </div>
  );
};

export default Inputs;
