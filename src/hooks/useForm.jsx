import { useState } from 'react';
import { ValidationService } from '../services';

const useForm = (initialValues, schema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = async (name, value) => {
    setValues({ ...values, [name]: value });

    const errorMessage = await ValidationService.validateField(schema, name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const updateField = (updateValue) => {
    setValues((prev) => ({ ...prev, ...updateValue }))
  }

  const isFormValid = async () => {

    const formErrors = await ValidationService.validateForm(schema, values);

    if (Object.keys(formErrors).length === 0) {
      setErrors({});
      return true;
    } else {
      setErrors(formErrors);
      return false;
    }
  };

  return {
    values,
    errors,
    handleChange,
    updateField,
    isFormValid,
  };
};

export default useForm;