import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateFullName
} from "../utils/validation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, checkUsername } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    let error = "";

    if (name === "username") {
      error = validateUsername(value);

      if (!error && value.length >= 3) {
        const exists = await checkUsername(value);

        if (exists) {
          error = "Username already exists";
        }
      }
    }

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "password") {
      error = validatePassword(value);
    }

    if (name === "fullName") {
      error = validateFullName(value);
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const fullNameError = validateFullName(formData.fullName);

    const newErrors = {
      username: usernameError,
      email: emailError,
      password: passwordError,
      fullName: fullNameError
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      await register({
        ...formData,
        avatar: "",
        createdAt: new Date().toISOString()
      });

      navigate("/dashboard");
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        {serverError && (
          <p className="text-red-500 mb-4">
            {serverError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-2 rounded"
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;