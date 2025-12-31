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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0b4d61] overflow-hidden">
      {/* Left Side: Login Form Area */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-6 lg:p-12 z-10 bg-[#0b4d61]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md overflow-hidden rounded-xl shadow-2xl border border-gray-700"
        >
          {/* Form Header (Dark Blue/Black) */}
          <div className="bg-[#1a2b3c] p-4 flex justify-center border-b border-gray-600">
            <img
              src="https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/logo-slogan.svg"
              alt="Accentra Logo"
              className="h-10 brightness-0 invert" // Makes the logo white to match dark header
            />
          </div>

          {/* Form Body (Light Gray) */}
          <div className="bg-[#ced6dc] p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#2c3e50]">Welcome Back</h2>
              <p className="text-gray-600 font-medium">Sign in to your dashboard</p>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email .company.com"
                    className="w-full px-4 py-3 rounded-lg border-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />

                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#3182ce] hover:bg-[#2b6cb0] text-white font-bold py-2 px-8 rounded-lg transition-colors shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? "..." : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="mt-8 text-center text-sm text-[#4a5568]">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#3182ce] hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Image with Slanted Divider */}
      <div 
        className="hidden md:block md:w-[55%] relative"
        style={{
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://accentra.co.uk/wp-content/uploads/2015/08/accentra-business-software-solutions1.jpg')",
          }}
        />
        {/* Overlay to match the blue-ish tint in image */}
        <div className="absolute inset-0 bg-blue-900/20" />
      </div>
    </div>
  );
};

export default Login;