import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email or username is required')
    .test(
      'email-or-username',
      'Please enter a valid email address or username',
      function (value) {
        if (!value) return false;
        // Check if it's a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if it's a valid username (alphanumeric, underscores, hyphens, 3-30 chars)
        const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;

        return emailRegex.test(value) || usernameRegex.test(value);
      }
    ),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
