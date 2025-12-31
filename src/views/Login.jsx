import React from "react";
import { Formik, Form, Field } from "formik";

/* ✅ Outside declarations */
const initialValues = {
  username: "",
  password: "",
};

const onSubmit = (values) => {
  console.log("Login Data:", values);
};

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Username</label>
              <Field
                type="text"
                name="username"
                placeholder="Enter username"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
