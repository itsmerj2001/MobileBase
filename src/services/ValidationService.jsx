
const validateForm = async (schema, values) => {
    try {
        await schema.validate(values, { abortEarly: false });
        return {}; 
    } catch (validationError) {
        const formattedErrors = {};
        validationError.inner.forEach((err) => {
            formattedErrors[err.path] = err.message;
        });
        return formattedErrors;
    }
};


const validateField = async (schema, fieldName, value) => {
    try {
        await schema.validateAt(fieldName, { [fieldName]: value });
        return null;
    } catch (error) {
        console.log(error);
        return error.message;
    }
};

export default { validateForm, validateField };