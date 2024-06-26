const AuthFormConsts = {
  EMAIL: "Enter your email",
  PASSWORD: "Enter your password",
  CONFIRM_PASSWORD: "Confirm the password",
  TITLE: {
    SIGN_IN: "Sign in",
    SIGN_UP: "Sign up"
  },
  QUESTION: {
    SIGN_IN: "Don't have an account? Sign Up",
    SIGN_UP: "Already have an account? Sign In"
  },
  ERRORS: {
    PASSWORD: {
      NOT_MATCH: "Passwords don't match",
      REQUIRED: "Password is required",
      MIN_LENGTH: "Min 6 characters"
    },
    EMAIL: {
      REQUIRED: "Email is required",
      INVALID: "Invalid email format"
    }
  }
}

const EMAIl_REG_EXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export { AuthFormConsts, EMAIl_REG_EXP };
