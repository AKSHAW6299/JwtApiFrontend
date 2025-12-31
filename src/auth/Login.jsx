import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { WebData } from "../contextApi/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { setUser } = useContext(WebData);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#083b4a] overflow-hidden relative">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          backgroundImage: "url('https://accentra.co.uk/wp-content/uploads/2015/08/accentra-business-software-solutions1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#083b4a] via-[#083b4a]/60 to-transparent z-1" />

      {/* LOGIN CONTENT AREA */}
      <div className="w-full md:w-[50%] flex items-center justify-center p-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl"
        >
          {/* Logo Section - Fully Transparent */}
          <div className="p-6 flex justify-center border-b border-white/10">
            <img
              src="https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/logo-slogan.svg"
              alt="Accentra Logo"
              className="h-12 brightness-0 invert" 
            />
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
              <p className="text-white/70 font-medium mt-2">Sign in to your dashboard</p>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div className="relative">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email .company.com"
                      className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-xs font-bold text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>

                  {/* Sign In Button - Transparent Outline Style */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="border-2 border-white text-white font-bold py-2.5 px-12 rounded-lg hover:bg-white hover:text-[#083b4a] transition-all duration-300 active:scale-95 disabled:opacity-30"
                    >
                      {isSubmitting ? "..." : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-sm text-white/60">
                Don't have an account?{" "}
                <Link to="/register" className="text-white hover:underline font-bold decoration-white/40 underline-offset-4 transition-all">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;