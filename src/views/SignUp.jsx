import React from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await API({
        url: "/auth/register",
        method: "POST",
        data: values,
      });

      alert("Registration successful");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={onSubmit}
      >
        <Form className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

          <Field name="name" placeholder="Name" className="input" />
          <Field name="email" placeholder="Email" className="input" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="input"
          />

          <button className="w-full bg-green-600 text-white py-2 rounded">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
