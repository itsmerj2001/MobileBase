import * as yup from "yup";

export default {
  login: yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  }),
  register: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  }),
  ForgotPassword: yup.object({
    email: yup.string().email().required(),
    verified: yup.boolean().default(false),
    otp: yup
      .string()
      .min(6, "OTP must be 6 digits")
      .max(6, "OTP must be 6 digits")
      .when("Verified", {
        is: true,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      }),
  }),
  ResetPassword: yup.object({
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().min(8).required(),
  }),
  UpdateProfile: yup.object({
    name: yup.string().min(3).max(15).required(),
    dob: yup.string().required(),
  })
};
