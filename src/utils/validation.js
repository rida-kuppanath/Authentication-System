export const validateUsername = (username) => {
  const value = username.trim();

  if (!value) {
    return "Username is required";
  }

  if (value.length < 3) {
    return "Username must be at least 3 characters";
  }

  if (value.length > 20) {
    return "Username must not exceed 20 characters";
  }

  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter a valid email";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateFullName = (fullName) => {
  if (!fullName.trim()) {
    return "Full name is required";
  }

  if (fullName.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }

  return "";
};