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
    // Updated background to match the dark teal tone in the image
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#083b4a] overflow-hidden">
      
      {/* Left Side: Login Form Area */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-6 lg:p-12 z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md overflow-hidden rounded-xl shadow-2xl"
        >
          {/* Form Header */}
          <div className="bg-[#111d2b] p-5 flex justify-center border-b border-white/10">
            <img
              src="https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/logo-slogan.svg"
              alt="Accentra Logo"
              className="h-10 brightness-0 invert opacity-90" 
            />
          </div>

          {/* Form Body - Soft Gray matching UI */}
          <div className="bg-[#d1d9e0] p-10">
            <div className="mb-10">
              <h2 className="text-3xl font-extrabold text-[#1a2b3c] tracking-tight">Welcome Back</h2>
              <p className="text-[#5a6b7d] font-medium mt-1">Sign in to your dashboard</p>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email .company.com"
                    className="w-full px-4 py-3.5 rounded-lg border-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-inner"
                  />

                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3.5 rounded-lg border-none bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-inner"
                  />

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#2a75bb] hover:bg-[#1e5a91] text-white font-bold py-2.5 px-10 rounded-lg transition-all transform active:scale-95 shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? "..." : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <p className="mt-10 text-center text-sm text-[#4a5568]">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#2a75bb] hover:underline font-bold">
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side: High-Quality Image with Refined Slanted Divider */}
      <div 
        className="hidden md:block md:w-[57%] absolute right-0 top-0 h-full z-10"
        style={{
          clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://accentra.co.uk/wp-content/uploads/2015/08/accentra-business-software-solutions1.jpg')",
            // This ensures the image doesn't look "smashed"
            backgroundSize: 'cover',
            backgroundPosition: 'right center' 
          }}
        />
        {/* Subtle Gradient Overlay to blend the image into the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#083b4a]/45 to-transparent" />
      </div>
    </div>
  );
};

export default Login;