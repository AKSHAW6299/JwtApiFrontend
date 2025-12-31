import React from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await API({
        url: "/auth/register",
        method: "POST",
        data: values,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Create Account
            </h2>

            <Field
              name="name"
              placeholder="Full Name"
              className="w-full mb-3 p-2 border rounded"
            />

            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
            />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full mb-4 p-2 border rounded"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="text-center mt-4 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-medium">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
