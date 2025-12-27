export interface PasswordValidationResult {
  isValid: boolean;
  error: string | null;
}

export function validatePassword(password: string): PasswordValidationResult {
  if (password.length < 6) {
    return {
      isValid: false,
      error: "Password must be at least 6 characters",
    };
  }
  return { isValid: true, error: null };
}

export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): PasswordValidationResult {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Passwords do not match",
    };
  }
  return { isValid: true, error: null };
}

export function validatePasswordAndMatch(
  password: string,
  confirmPassword: string
): PasswordValidationResult {
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return validatePasswordMatch(password, confirmPassword);
}
