import React, { useState } from "react";

export function useFormWithValidation() {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValue({ ...value, [name]: value });
    setError({ ...error, [name]: input.validationMessage });
    isValid(input.closest("form").validity.valid);
  };

  const resetForm = React.useCallback((
    newValue = {}, 
    newError = {}, 
    newIsValid = false) => {
      setValue(newValue);
      setError(newError);
      setIsValid(newIsValid);
    },
    [setValue, setError, setIsValid]
  );

  return {value, error, isValid, setIsValid, setValue,  setError, handleChange, resetForm};
};


