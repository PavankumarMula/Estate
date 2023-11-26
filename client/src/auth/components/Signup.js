import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../AuthSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    let validateErrors = validateData(formData);
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length > 0) {
      return;
    }

    setFormData({ email: "", password: "", confirmPassword: "" });
    setErrors({});
    dispatch(
      createUserAsync({ email: formData.email, password: formData.password })
    );
    navigate("/login");
  };

  const inputHandler = (e) => {
    setFormData((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <span className="text-red-500 mb-2">
                  {errors.email && errors.email}
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={inputHandler}
                  autoComplete="email"
                  value={formData.email}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-red-500 mb-2">
                {errors.password && errors.password}
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={inputHandler}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <span className="text-red-500 mb-2">
                {errors.confirmPwd && errors.confirmPwd}
              </span>

              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                onChange={inputHandler}
                value={formData.confirmPassword}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Signup
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member ?{" "}
            <Link
              to="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

export const validateData = (formData) => {
  let errors = {};

  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim() || !emailRegex.test(formData.email)) {
    errors.email = "Valid email is required";
  }

  // password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (!formData.password.trim() || !passwordRegex.test(formData.password)) {
    errors.password =
      " password Should at least 8 characters should contain 1 Capital";
  }

  // conform-password
  if (
    !formData.confirmPassword.trim() ||
    formData.password !== formData.confirmPassword
  ) {
    errors.confirmPwd = "password is not matching";
  }

  return errors;
};
