import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { WebData } from "../contextApi/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { setUser } = useContext(WebData);
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your dashboard
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 border rounded-md
                               focus:outline-none focus:ring-2
                               focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2 border rounded-md
                               focus:outline-none focus:ring-2
                               focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-md
                             font-medium tracking-wide
                             transition-all duration-200
                             hover:bg-blue-700
                             active:scale-[0.98]
                             disabled:opacity-60"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Footer */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
