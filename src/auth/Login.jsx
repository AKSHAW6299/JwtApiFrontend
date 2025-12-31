import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { WebData } from "../contextApi/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(WebData);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = await API({
        url: "/auth/login",
        method: "POST",
        data: values,
      });

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
        <Form className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

          <Field
            name="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
          />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
