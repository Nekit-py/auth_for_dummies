enum AuthFormConsts {
  EMAIL = "Enter your email",
  PASSWORD = "Enter your password",
  CONFIRM_PASSWORD = "Confirm the password",

  SIGN_IN_TITLE = "Sign in",
  SIGN_UP_TITLE = "Sign up",

  SIGN_IN_QUESTION = "Don't have an account? Sign Up",
  SIGN_UP_QUESTION = "Already have an account? Sign In",

  PASSWORD_NOT_MATCH = "Passwords don't match",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_MIN_LENGTH = "Min 6 characters",

  EMAIL_REQUIRED = "Email is required",
  EMAIL_INVALID = "Invalid email format"
}

const EMAIl_REG_EXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export { AuthFormConsts, EMAIl_REG_EXP };
